<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Recipe extends Model
{
    use SoftDeletes;
    protected $table = 'recipe';

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    public static function getById($id)
    {
        return DB::table('recipe')
            ->select(
                'recipe.id',
                'recipe.name',
                'recipe.user_id',
                'recipe_category.id AS recipe_category_id',
                'recipe_category.name AS recipe_category_name',
                'cuisine_type.id AS cuisine_type_id',
                'cuisine_type.name AS cuisine_type',
                'recipe.created_at'
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->where('recipe.id', $id)
            ->first();
    }

    public static function getUserRecipes($params)
    {
        return DB::table('recipe')
            ->select('recipe.name',
                'recipe.id',
                'recipe_category_id',
                'recipe_category.name AS recipe_category',
                'cuisine_type.name AS cuisine_type',
                'recipe.created_at',
                'recipe.updated_at'
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->where('user_id', $params['user_id'])
            ->where('recipe.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->take($params['take'])
            ->offset($params['offset'])
            ->get();
    }
}
