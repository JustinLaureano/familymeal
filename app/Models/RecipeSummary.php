<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeSummary extends Model
{
    protected $table = 'recipe_summary';

    protected $hidden = ['created_at', 'updated_at'];

    public static function getByRecipeId($recipe_id)
    {
        return self::where('recipe_id', $recipe_id)->first();
    }
}
