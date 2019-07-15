<?php

namespace App\Models;

use App\Models\RecipeDirections;
use Illuminate\Database\Eloquent\Model;

class RecipeDirections extends Model
{
    protected $table = 'recipe_directions';

    public static function getByRecipeId($recipe_id)
    {
        return RecipeDirections::where('recipe_id', $recipe_id)
            ->orderBy('order', 'asc')
            ->get();
    }
}
