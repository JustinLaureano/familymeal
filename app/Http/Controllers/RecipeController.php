<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $recipe = Recipe::find($recipe_id);
        $recipe_ingredients = RecipeIngredients::where('recipe_id', $recipe_id);
        $recipe_ingredients = RecipeDirections::where('recipe_id', $recipe_id);
        $recipe_notes = RecipeNotes::where('recipe_id', $recipe_id);
        $recipe_ratings = RecipeRatings::where('recipe_id', $recipe_id);
        $recipe_summary = RecipeSummary::where('recipe_id', $recipe_id);
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

    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {
        Recipe::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
