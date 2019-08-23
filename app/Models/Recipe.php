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
                'recipe.difficulty',
                'recipe.portions',
                'recipe.prep_time',
                'recipe.cook_time',
                'recipe.created_at',
                DB::raw('IF(favorite_recipes.id IS NOT NULL, \'true\', \'false\') AS favorite')
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->leftJoin('favorite_recipes', function($leftJoin) {
                $leftJoin->on('recipe.id', '=', 'favorite_recipes.recipe_id')
                    ->on('recipe.user_id', '=', 'favorite_recipes.user_id');
            })
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
                'recipe.updated_at',
                DB::raw('IF(favorite_recipes.id IS NOT NULL, \'true\', \'false\') AS favorite')
            )
            ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
            ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
            ->leftJoin('favorite_recipes', function($leftJoin) {
                $leftJoin->on('recipe.id', '=', 'favorite_recipes.recipe_id')
                    ->on('recipe.user_id', '=', 'favorite_recipes.user_id');
            })
            ->where('recipe.user_id', $params['user_id'])
            ->where('recipe.deleted_at', Null)
            ->when(isset($params['categories']) && count($params['categories']), function($query) use($params) {
                return $query->whereIn('recipe.recipe_category_id', $params['categories']);
            })
            ->when(isset($params['cuisines']) && count($params['cuisines']), function($query) use($params) {
                return $query->whereIn('recipe.cuisine_type_id', $params['cuisines']);
            })
            ->orderBy('name', 'asc')
            ->take($params['take'])
            ->offset($params['offset'])
            ->get();
    }

    public static function getSearchResults($params = null)
    {
        if (!$params) return [];

        $take = 25;

        return DB::table('recipe')
            ->select(
                'recipe.name',
                'recipe.id',
                DB::raw('IF(favorite_recipes.id IS NOT NULL, \'true\', \'false\') AS favorite')
            )
            ->leftJoin('favorite_recipes', function($leftJoin) {
                $leftJoin->on('recipe.id', '=', 'favorite_recipes.recipe_id')
                    ->on('recipe.user_id', '=', 'favorite_recipes.user_id');
            })
            ->where('recipe.user_id', $params['user_id'])
            ->where('name', 'like', '%' . $params['value'] . '%')
            ->where('recipe.deleted_at', Null)
            ->when($params['favorites'], function($query) {
                return $query->whereNotNull('favorite_recipes.id');
            })
            ->orderBy('name', 'asc')
            ->take($take)
            ->get();
    }

    public static function getCountByCategory($user_id = null)
    {
        if (!$user_id) return [];

        return DB::table('recipe_category')
            ->select('recipe_category.id',
                'recipe_category.name',
                DB::raw('COUNT(recipe_category.id) AS count')
            )
            ->leftJoin('recipe', 'recipe_category.id', 'recipe.recipe_category_id')
            ->where('recipe.user_id', $user_id)
            ->where('recipe.deleted_at', Null)
            ->groupBy('recipe_category.id', 'recipe_category.name')
            ->orderBy('recipe_category.name', 'asc')
            ->get();
    }
}
