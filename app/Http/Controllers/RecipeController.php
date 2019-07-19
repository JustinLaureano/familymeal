<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeDirections;
use App\Models\RecipeIngredients;
use App\Models\RecipeNotes;
use App\Models\RecipePhoto;
use App\Models\RecipeRatings;
use App\Models\RecipeSummary;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;

class RecipeController extends Controller
{

    private $new_id_floor = 900000;

    public function index(Request $request, $user_id)
    {
        $page = $request->page ? intval($request->page) : 1;
        $user = User::find($user_id);
        $user_settings = UserSettings::where('user_id', $user_id)->first();
        $offset = $page == 1 ? 0 : ($page - 1) * intval($user_settings->table_result_limit);

        $recipes = Recipe::getUserRecipes([
            'user_id' => $user_id,
            'take' => $user_settings->table_result_limit,
            'offset' => $offset,
        ]);

        return response(['recipes' => $recipes], 200);
    }


    public function store(Request $request)
    {

    }

    public function show(Request $request, $recipe_id)
    {
        return response([
            'info' => Recipe::getById($recipe_id),
            'photo' => RecipePhoto::getByRecipeId($recipe_id),
            'summary' => RecipeSummary::getByRecipeId($recipe_id),
            'ratings' => RecipeRatings::getByRecipeId($recipe_id),
            'ingredients' => RecipeIngredients::getByRecipeId($recipe_id),
            'directions' => RecipeDirections::getByRecipeId($recipe_id),
            'notes' => RecipeNotes::getByRecipeId($recipe_id),
        ], 200);
    }

    public function update(Request $request, $recipe_id)
    {
        $updates = [];
        $response = null;
        $recipe = Recipe::find($recipe_id);

        if ($request->post('name')) {
            $recipe->name = $request->post('name');
            $updates[] = 'name';
        }

        if ($request->post('photo')) {
            // request()->validate([
            //     'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // ]);

            $photo = $request->post('photo');
            $recipe_name = str_replace(' ', '_', $recipe->name);
            $file_name = $recipe_id . '_' .$recipe_name . $photo->getClientOriginalExtension();

            Image::make($photo)
                ->resize(150, 150)
                ->save(storage_path('uploads/recipe_photos/' . $file_name));

            if (RecipePhoto::where('recipe_id', $recipe_id)->exists()) {
                $recipe_photo = RecipePhoto::where('recipe_id', $recipe_id)->first();
                $old_filename = $recipe_photo->file_name;

                Storage::delete(storage_path('uploads/recipe_photos/' . $old_filename));
                $recipe_photo->file_name = $file_name;
                $recipe_photo->save();
            }
            else {
                $recipe_photo = new RecipePhoto;
                $recipe_photo->recipe_id = $recipe_id;
                $recipe_photo->file_name = $file_name;
                $recipe_photo->save();
            }

            $updates[] = 'photo';
            $response = $recipe_photo;
        }

        if ($request->post('rating')) {
            $user_id = $request->post('user_id');
            $recipe_rating = RecipeRatings::where('user_id', $user_id)
                ->where('recipe_id', $recipe_id)
                ->first();
            $recipe_rating->rating = $request->post('rating');
            $recipe_rating->save();
            $updates[] = 'rating';
        }
        
        if ($request->post('summary')) {
            $recipe_summary = RecipeSummary::where('recipe_id', $recipe_id)->first();
            $recipe_summary->summary = $request->post('summary');
            $recipe_summary->save();
            $updates[] = 'summary';
        }

        if ($request->post('difficulty')) {
            $recipe->difficulty = $request->post('difficulty');
            $updates[] = 'difficulty';
        }

        if ($request->post('portions')) {
            $recipe->portions = $request->post('portions');
            $updates[] = 'portions';
        }

        if ($request->post('prep_time')) {
            $recipe->prep_time = $request->post('prep_time');
            $updates[] = 'prep_time';
        }

        if ($request->post('cook_time')) {
            $recipe->cook_time = $request->post('cook_time');
            $updates[] = 'cook_time';
        }

        if ($request->post('cuisine')) {
            $recipe->cuisine_type_id = $request->post('cuisine');
            $updates[] = 'cuisine';
        }

        if ($request->post('category')) {
            $recipe->recipe_category_id = $request->post('category');
            $updates[] = 'category';
        }

        if ($request->post('ingredients')) {
            $ingredients = $request->post('ingredients');

            // Check ingredient deletions
            $old_recipe_ingredient_ids = RecipeIngredients::select('id')
                ->where('recipe_id', $recipe_id)
                ->get();

            $new_ingredient_ids = [];
            foreach ($ingredients as $ingredient)
                $new_ingredient_ids[] = $ingredient['id'];

            foreach ($old_recipe_ingredient_ids as $old_ingredient)
                if (!in_array($old_ingredient['id'], $new_ingredient_ids))
                    RecipeIngredients::destroy($old_ingredient['id']);

            $order = 1;
            foreach ($ingredients as $rec_ingredient) {
                if ($rec_ingredient['id'] >= $this->new_id_floor) {
                    // New Recipe Ingredient
                    $recipe_ingredient = new RecipeIngredients;
                    $recipe_ingredient->recipe_id = $recipe_id;
                    $recipe_ingredient->order = $order;

                    // determine ingredient used
                    if ($rec_ingredient['ingredient_id'] && 
                        $rec_ingredient['ingredient_id'] < $this->new_id_floor)
                    {
                        // use a current ingredient
                        $ingredient = Ingredient::find($rec_ingredient['ingredient_id']);
                        $recipe_ingredient->ingredient_id = $ingredient->id;
                    }
                    else if ($rec_ingredient['ingredient_recipe_id']) {
                        // Using recipe as ingredient item
                        $recipe = Recipe::find($rec_ingredient['ingredient_recipe_id']);
                        $recipe_ingredient->ingredient_recipe_id = $recipe->id;
                    }
                    else {
                        // Try to find ingredient by name match
                        $ingredient_match = Ingredient::where('name', $rec_ingredient['ingredient_name'])->first();

                        if ($ingredient_match) {
                            // Use found ingredient
                            $recipe_ingredient->ingredient_id = $ingredient_match->id;
                        }
                        else {
                            // New Ingredient
                            $new_ingredient = new Ingredient;
                            $new_ingredient->name = $rec_ingredient['ingredient_name'];
                            // TODO: include way to save ingredient_category_id and ingredient_subcategory_id
                            $new_ingredient->created_user_id = $request->post('user_id');
                            $new_ingredient->save();

                            $recipe_ingredient->ingredient_id = $new_ingredient->id;
                        }
                    }

                    $recipe_ingredient->ingredient_units = $rec_ingredient['ingredient_units'];
                    $recipe_ingredient->measurement_unit_id = $rec_ingredient['measurement_unit_id'];
                    $recipe_ingredient->save();
                }
                else {
                    // Update Ingredient
                    $recipe_ingredient = RecipeIngredients::find($rec_ingredient['id']);
                    $recipe_ingredient->order = $order;
                    $recipe_ingredient->save();
                }
                $order++;
            }

            $updates[] = 'ingredients';
            $response = RecipeIngredients::getByRecipeId($recipe_id);
        }

        if ($request->post('directions')) {
            $directions = $request->post('directions');

            // Check direction deletions
            $old_recipe_direction_ids = RecipeDirections::select('id')
                ->where('recipe_id', $recipe_id)
                ->get();

            $new_direction_ids = [];
            foreach ($directions as $direction)
                $new_direction_ids[] = $direction['id'];

            foreach ($old_recipe_direction_ids as $old_direction)
                if (!in_array($old_direction['id'], $new_direction_ids))
                    RecipeDirections::destroy($old_direction['id']);

            $order = 1;
            foreach ($directions as $direction) {
                if ($direction['id'] >= $this->new_id_floor) {
                    // New Recipe Direction
                    $recipe_direction = new RecipeDirections;
                    $recipe_direction->recipe_id = $recipe_id;
                    $recipe_direction->order = $order;
                    $recipe_direction->direction = $direction['direction'];
                    $recipe_direction->save();
                }
                else {
                    // Update Direction
                    $recipe_direction = RecipeDirections::find($direction['id']);
                    $recipe_direction->order = $order;
                    $recipe_direction->save();
                }
                $order++;
            }

            $updates[] = 'directions';
            $response = RecipeDirections::getByRecipeId($recipe_id);
        }

        if ($request->post('notes')) {
            $notes = $request->post('notes');

            // Check note deletions
            $old_recipe_note_ids = RecipeNotes::select('id')
                ->where('recipe_id', $recipe_id)
                ->get();

            $new_note_ids = [];
            foreach ($notes as $note)
                $new_note_ids[] = $note['id'];

            foreach ($old_recipe_note_ids as $old_note)
                if (!in_array($old_note['id'], $new_note_ids))
                    RecipeNotes::destroy($old_note['id']);

            $order = 1;
            foreach ($notes as $note) {
                if ($note['id'] >= $this->new_id_floor) {
                    // New Recipe Note
                    $recipe_note = new RecipeNotes;
                    $recipe_note->recipe_id = $recipe_id;
                    $recipe_note->order = $order;
                    $recipe_note->note = $note['note'];
                    $recipe_note->save();
                }
                else {
                    // Update Note
                    $recipe_note = RecipeNotes::find($note['id']);
                    $recipe_note->order = $order;
                    $recipe_note->save();
                }
                $order++;
            }

            $updates[] = 'notes';
            $response = RecipeNotes::getByRecipeId($recipe_id);
        }

        $recipe->save();
        $data = ['recipe_id' => $recipe_id, 'updates' => $updates,];

        if ($response) 
            $data['response'] = $response;

        $data['request'] = $request->all();

        return response($data, 200);
    }

    public function destroy($id)
    {
        Recipe::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
