<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeDirections extends Model
{
    protected $table = 'recipe_directions';

    protected $hidden = ['created_at', 'updated_at'];

    public static function getByRecipeId($recipe_id)
    {
        return self::where('recipe_id', $recipe_id)
            ->orderBy('order', 'asc')
            ->get();
    }
}
