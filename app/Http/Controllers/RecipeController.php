<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\RecipeDirections;
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

        $recipe_ingredients = DB::table('recipe_ingredients')
            ->select(
                'recipe_ingredients.id',
                'recipe_ingredients.order',
                'recipe_ingredients.ingredient_id',
                'ingredient.name AS ingredient_name',
                'ingredient_recipe_id',
                'recipe.name AS ingredient_recipe_name',
                'ingredient_units',
                'measurement_units.name AS measurement_unit'
            )
            ->leftJoin('ingredient', 'recipe_ingredients.ingredient_id', 'ingredient.id')
            ->leftJoin('recipe', 'recipe_ingredients.ingredient_recipe_id', 'recipe.id')
            ->leftJoin('measurement_units', 'recipe_ingredients.measurement_unit_id', 'measurement_units.id')
            ->where('recipe_id', $recipe_id)
            ->orderBy('recipe_ingredients.order', 'asc')
            ->get();

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

    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {
        Recipe::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
