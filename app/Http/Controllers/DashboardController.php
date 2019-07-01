<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeIngredients;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show($user_id) {
        $recipes = Recipe::where('user_id', $user_id)->get();

        foreach($recipes as $recipe) {
            $recipe['ingredients'] = RecipeIngredients::where('recipe_id', $recipe->id)->get();
        }
        $response = [
            'recipes' => $recipes
        ];
        return response($response, 200);
    }
}
