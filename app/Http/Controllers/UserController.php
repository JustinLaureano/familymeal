<?php

namespace App\Http\Controllers;

use App\Models\CuisineType;
use App\Models\Ingredient;
use App\Models\IngredientCategory;
use App\Models\IngredientSubcategory;
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
        $ingredient_categories = IngredientCategory::where('deleted_at', Null)->orderBy('name')->get();
        $ingredient_subcategories = IngredientSubcategory::where('deleted_at', Null)->orderBy('name')->get();
        
        $measurement_units = MeasurementUnits::orderBy('measurement_system', 'desc')
        ->orderBy('measurement_type', 'asc')
        ->orderBy('name', 'asc')
        ->get();
        
        $recipe_categories = RecipeCategory::orderBy('name')->get();
        $user_settings = UserSettings::where('user_id', $id)->first();

        $ingredients = Ingredient::getUserIngredients([
            'user_id' => $id,
            'take' => $user_settings->table_result_limit,
            'offset' => 0,
        ]);
        
        $recipes = Recipe::getUserRecipes([
            'user_id' => $id,
            'take' => $user_settings->table_result_limit,
            'offset' => 0,
        ]);

        $data = [
            'cuisine_types' => $cuisine_types,
            'ingredients' => $ingredients,
            'ingredient_categories' => $ingredient_categories,
            'ingredient_subcategories' => $ingredient_subcategories,
            'ingredient_total' => Ingredient::getUserTotal($id),
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
