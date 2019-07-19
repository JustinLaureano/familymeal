<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RecipeIngredients extends Model
{
    protected $table = 'recipe_ingredients';

    protected $hidden = ['created_at', 'updated_at'];

    public static function getByRecipeId($recipe_id)
    {
        return DB::table('recipe_ingredients')
            ->select(
                'recipe_ingredients.id',
                'recipe_ingredients.order',
                'recipe_ingredients.ingredient_id',
                'ingredient.name AS ingredient_name',
                'ingredient_recipe_id',
                'recipe.name AS ingredient_recipe_name',
                'ingredient_units',
                'measurement_units.id AS measurement_unit_id',
                'measurement_units.name AS measurement_unit'
            )
            ->leftJoin('ingredient', 'recipe_ingredients.ingredient_id', 'ingredient.id')
            ->leftJoin('recipe', 'recipe_ingredients.ingredient_recipe_id', 'recipe.id')
            ->leftJoin('measurement_units', 'recipe_ingredients.measurement_unit_id', 'measurement_units.id')
            ->where('recipe_id', $recipe_id)
            ->orderBy('recipe_ingredients.order', 'asc')
            ->get();
    }
}
