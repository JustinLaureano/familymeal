<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipeDirections;
use App\Models\RecipeIngredients;
use App\Models\RecipeNotes;
use App\Models\RecipeRatings;
use App\Models\RecipeSummary;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{

    private $new_id_floor = 900000;

    public function index(Request $request, $user_id)
    {
        $page = $request->page ? intval($request->page) : 1;
        $user = User::find($user_id);
        $user_settings = UserSettings::where('user_id', $user_id)->first();
        $offset = ($page == 1 ? 1 : $page - 1) * intval($user_settings->table_result_limit);

        $recipes = DB::table('recipe')
            ->select('recipe.name',
                'recipe.id',
                'recipe_category_id',
                'recipe_category.name AS recipe_category',
                'cuisine_type.name AS cuisine_type',
                'recipe.created_at',
                'recipe.updated_at'
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->where('user_id', $user_id)
            ->where('recipe.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->take($user_settings->table_result_limit)
            ->offset($offset)
            ->get();

        return response(['recipes' => $recipes], 200);
    }


    public function store(Request $request)
    {

    }

    public function show(Request $request, $recipe_id)
    {
        $recipe = DB::table('recipe')
            ->select(
                'recipe.id',
                'recipe.name',
                'recipe.user_id',
                'recipe_category.id AS recipe_category_id',
                'recipe_category.name AS recipe_category_name',
                'cuisine_type.id AS cuisine_type_id',
                'cuisine_type.name AS cuisine_type',
                'recipe.created_at'
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->where('recipe.id', $recipe_id)
            ->first();

        $recipe_ingredients = RecipeIngredients::getByRecipeId($recipe_id);

        $recipe_directions = RecipeDirections::where('recipe_id', $recipe_id)
            ->orderBy('order', 'asc')
            ->get();

        $recipe_notes = RecipeNotes::where('recipe_id', $recipe_id)->get();
        $recipe_ratings = RecipeRatings::where('recipe_id', $recipe_id)->get();
        $recipe_summary = RecipeSummary::where('recipe_id', $recipe_id)->first();

        $data = [
            'recipe' => [
                'info' => $recipe,
                'summary' => $recipe_summary,
                'ratings' => $recipe_ratings,
                'ingredients' => $recipe_ingredients,
                'directions' => $recipe_directions,
                'notes' => $recipe_notes,
            ]
        ];

        return response($data, 200);
    }

    public function update(Request $request, $recipe_id)
    {
        $updates = [];
        $response = null;
        $recipe = Recipe::find($recipe_id);

        if ($request->post('name')) {
            $recipe->name = $request->post('name');
            $recipe->save();
            $updates[] = 'name';
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

        if ($request->post('cuisine')) {
            $recipe->cuisine_type_id = $request->post('cuisine');
            $recipe->save();
            $updates[] = 'cuisine';
        }

        if ($request->post('category')) {
            $recipe->recipe_category_id = $request->post('category');
            $recipe->save();
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
                    // New Recipe Ingredient
                    $recipe_direction = new RecipeDirections;
                    $recipe_direction->recipe_id = $recipe_id;
                    $recipe_direction->order = $order;
                    $recipe_direction->direction = $direction['direction'];
                    $recipe_direction->save();
                }
                else {
                    // Update Ingredient
                    $recipe_direction = RecipeDirections::find($direction['id']);
                    $recipe_direction->order = $order;
                    $recipe_direction->save();
                }
                $order++;
            }

            $updates[] = 'directions';
            $response = RecipeDirections::getByRecipeId($recipe_id);
        }

        $data = ['recipe_id' => $recipe_id, 'updates' => $updates,];

        if ($response) 
            $data['response'] = $response;

        return response($data, 200);
    }


    public function destroy($id)
    {
        Recipe::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
