<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FavoriteRecipes extends Model
{
    protected $table = 'favorite_recipes';

    protected $hidden = ['created_at', 'updated_at'];

    public static function getUserRecipes($params)
    {
        return DB::table('favorite_recipes')
            ->select('recipe.name',
                'recipe.id',
                'recipe_category_id',
                'recipe_category.name AS recipe_category',
                'cuisine_type.name AS cuisine_type',
                'recipe.created_at',
                'recipe.updated_at'
            )
            ->leftJoin('recipe', 'favorite_recipes.recipe_id', 'recipe.id')
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->where('recipe.user_id', $params['user_id'])
            ->where('recipe.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->take($params['take'])
            ->offset($params['offset'])
            ->get();
    }

    public static function getUserTotal($user_id)
    {
        return DB::table('favorite_recipes')
        ->select('favorite_recipes.id')
        ->leftJoin('recipe', 'favorite_recipes.recipe_id', 'recipe.id')
        ->where('favorite_recipes.user_id', $user_id)
        ->where('recipe.deleted_at', Null)
        ->count();
    }
}
