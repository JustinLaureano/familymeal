<?php

namespace App\Http\Controllers;

use App\Models\CuisineType;
use App\Models\MeasurementUnits;
use App\Models\Recipe;
use App\Models\RecipeCategory;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function index()
    {
    }

    public function init($id)
    {
        $cuisine_types = CuisineType::orderBy('name', 'asc')->get();

        $measurement_units = MeasurementUnits::orderBy('measurement_system', 'desc')
            ->orderBy('measurement_type', 'asc')
            ->orderBy('name', 'asc')
            ->get();

        $recipe_categories = RecipeCategory::orderBy('name')->get();

        $ingredients = DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name',
                'ingredient_category_id',
                'ingredient_category.name AS ingredient_category_name'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->where('created_user_id', Null)
            ->orWhere('created_user_id', $id)
            ->orderBy('name', 'asc')
            ->get();

        $user_settings = UserSettings::where('user_id', $id)->first();

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
            ->where('user_id', $id)
            ->where('recipe.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->limit($user_settings->table_result_limit)
            ->get();

        $data = [
            'cuisine_types' => $cuisine_types,
            'ingredients' => $ingredients,
            'measurement_units' => $measurement_units,
            'recipes' => $recipes,
            'recipe_categories' => $recipe_categories,
            'recipe_total' => Recipe::where('user_id', $id)->where('deleted_at', Null)->count(),
            'user' => User::where('id', $id)->first(),
            'user_settings' => $user_settings,
        ];

        return response($data, 200);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return response(User::find($id)->get(), 200);
    }

    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
