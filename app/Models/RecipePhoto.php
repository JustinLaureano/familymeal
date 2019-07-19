<?php

namespace App\Models;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Model;

class RecipePhoto extends Model
{
    protected $table = 'recipe_photo';

    public static function updateRecipePhoto($recipe_id, $photo)
    {
        $recipe = Recipe::find($recipe_id);
        $recipe_name = str_replace(' ', '_', $recipe->name);
        $file_name = $recipe_id . '_' .$recipe_name . $photo->getClientOriginalExtension();

        Image::make($photo)->resize(150, 150)->save(storage_path('uploads/recipe_photos/' . $filename));
    }
}
