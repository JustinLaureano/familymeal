<?php

namespace App\Models;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Model;

class RecipePhoto extends Model
{
    protected $table = 'recipe_photos';

    public static function getByRecipeId($recipe_id)
    {
        return self::where('recipe_id', $recipe_id)->first();
    }
}
