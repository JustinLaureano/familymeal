<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Ingredient extends Model
{
    use SoftDeletes;
    protected $table = 'ingredient';

    public static function getByUserId($id)
    {
        return DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name',
                'ingredient.ingredient_category_id',
                'ingredient_category.name AS ingredient_category_name',
                'ingredient.ingredient_subcategory_id',
                'ingredient_subcategory.name AS ingredient_subcategory_name',
                'ingredient.created_user_id'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->leftJoin('ingredient_subcategory', 'ingredient.ingredient_subcategory_id', 'ingredient_subcategory.id')
            ->where('created_user_id', Null)
            ->orWhere('created_user_id', $id)
            ->orderBy('name', 'asc')
            ->get();
    }

    
    public static function getUserIngredients($params)
    {
        return DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name',
                'ingredient.ingredient_category_id',
                'ingredient_category.name AS ingredient_category_name',
                'ingredient.ingredient_subcategory_id',
                'ingredient_subcategory.name AS ingredient_subcategory_name',
                'ingredient.created_user_id'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->leftJoin('ingredient_subcategory', 'ingredient.ingredient_subcategory_id', 'ingredient_subcategory.id')
            ->where(function ($query) use($params) {
                $query->where('ingredient.created_user_id', Null)
                    ->orWhere('ingredient.created_user_id', $params['user_id']);
            })
            ->where('ingredient.deleted_at', Null)
            ->when(isset($params['categories']) && count($params['categories']), function($query) use($params) {
                return $query->whereIn('ingredient.ingredient_category_id', $params['categories']);
            })
            ->when(isset($params['subcategories']) && count($params['subcategories']), function($query) use($params) {
                return $query->whereIn('ingredient.ingredient_subcategory_id', $params['subcategories']);
            })
            ->orderBy('ingredient.name', 'asc')
            ->take($params['take'])
            ->offset($params['offset'])
            ->get();
    }

    public static function getById($ingredient_id)
    {
        return DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name',
                'ingredient.ingredient_category_id',
                'ingredient_category.name AS ingredient_category_name',
                'ingredient.ingredient_subcategory_id',
                'ingredient_subcategory.name AS ingredient_subcategory_name',
                'ingredient.created_user_id'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->leftJoin('ingredient_subcategory', 'ingredient.ingredient_subcategory_id', 'ingredient_subcategory.id')
            ->where('ingredient.id', $ingredient_id)
            ->first();
    }

    public static function getSearchResults($params = null)
    {
        if (!$params) return [];

        $take = 25;

        // get direct matches to search value
        $ingredient_match_results = DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name'
            )
            ->where(function ($query) use($params) {
                $query->where('ingredient.created_user_id', Null)
                    ->orWhere('ingredient.created_user_id', $params['user_id']);
            })
            ->where('name', 'like', $params['value'] . '%')
            ->where('ingredient.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->get();

        $match_results = [];

        foreach($ingredient_match_results as $result) {
            $match_results[] = $result;
        }

        // include recipes into search results if needed
        if ($params['include_recipes']) {
            $recipe_results = DB::table('recipe')
            ->select(
                'recipe.id',
                'recipe.name'
            )
            ->where(function ($query) use($params) {
                $query->where('recipe.user_id', Null)
                    ->orWhere('recipe.user_id', $params['user_id']);
            })
            ->where('recipe.name', 'like', $params['value'] . '%')
            ->where('recipe.deleted_at', Null)
            ->orderBy('recipe.name', 'asc')
            ->get();

            foreach($recipe_results as $result) {
                $result->recipe_id = $result->id;
                $match_results[] = $result;
            }
        }

        // Sort match results
        usort($match_results, function($first, $second) {
            return strcmp($first->name, $second->name);
        });

        // get results for ingredients that partially match search value
        $ingredient_like_results = DB::table('ingredient')
            ->select(
                'ingredient.id',
                'ingredient.name'
            )
            ->where(function ($query) use($params) {
                $query->where('ingredient.created_user_id', Null)
                    ->orWhere('ingredient.created_user_id', $params['user_id']);
            })
            ->where('name', 'like', '%' . $params['value'] . '%')
            ->where('ingredient.deleted_at', Null)
            ->take($take)
            ->orderBy('ingredient.name', 'asc')
            ->get();

        foreach($ingredient_like_results as $result) {
            $match_results[] = $result;
        }

        // return the most relevant results
        return array_slice($match_results, 0, $take);
    }

    public static function getCountByCategory($user_id = null)
    {
        if (!$user_id) return [];

        return DB::table('ingredient_category')
            ->select('ingredient_category.name',
                DB::raw('COUNT(ingredient_category.id) AS count')
            )
            ->leftJoin('ingredient', 'ingredient_category.id', 'ingredient.ingredient_category_id')
            ->where(function ($query) use($user_id) {
                $query->where('ingredient.created_user_id', Null)
                    ->orWhere('ingredient.created_user_id', $user_id);
            })
            ->where('ingredient.deleted_at', Null)
            ->groupBy('ingredient_category.id')
            ->orderBy('ingredient_category.name', 'asc')
            ->get();
    }

    public static function getUserTotal($user_id = null)
    {
        if (!$user_id) return 0;

        return DB::table('ingredient')
            ->where(function ($query) use($user_id) {
                $query->where('ingredient.created_user_id', Null)
                    ->orWhere('ingredient.created_user_id', $user_id);
            })
            ->where('deleted_at', Null)
            ->count();
    }
}
