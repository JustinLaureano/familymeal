<?php

namespace App\Models;

use App\Models\RecipeNotes;
use Illuminate\Database\Eloquent\Model;

class RecipeNotes extends Model
{
    protected $table = 'recipe_notes';

    public static function getByRecipeId($recipe_id)
    {
        return RecipeNotes::where('recipe_id', $recipe_id)
            ->orderBy('order', 'asc')
            ->get();
    }
}
