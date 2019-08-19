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
                'ingredient_subcategory.name AS ingredient_subcategory_name'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->leftJoin('ingredient_subcategory', 'ingredient.ingredient_subcategory_id', 'ingredient_subcategory.id')
            ->where('created_user_id', Null)
            ->orWhere('created_user_id', $id)
            ->orderBy('name', 'asc')
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
                'ingredient_subcategory.name AS ingredient_subcategory_name'
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

        return DB::table('ingredient')
            ->select(
                'ingredient.name',
                'ingredient.id'
            )
            ->whereIn('ingredient.user_id', [Null, $params['user_id']])
            ->where('name', 'like', '%' . $params['value'] . '%')
            ->where('ingredient.deleted_at', Null)
            ->orderBy('name', 'asc')
            ->take($take)
            ->get();
    }

    public static function getCountByCategory($user_id = null)
    {
        if (!$user_id) return [];

        return DB::table('ingredient_category')
            ->select('ingredient_category.name',
                DB::raw('COUNT(ingredient_category.id) AS count')
            )
            ->leftJoin('ingredient', 'ingredient_category.id', 'ingredient.ingredient_category_id')
            ->whereIn('ingredient.user_id', [Null, $user_id])
            ->where('ingredient.deleted_at', Null)
            ->groupBy('ingredient_category.id')
            ->orderBy('ingredient_category.name', 'asc')
            ->get();
    }
}
