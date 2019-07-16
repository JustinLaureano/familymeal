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
                'ingredient_category_id',
                'ingredient_category.name AS ingredient_category_name'
            )
            ->leftJoin('ingredient_category', 'ingredient.ingredient_category_id', 'ingredient_category.id')
            ->where('created_user_id', Null)
            ->orWhere('created_user_id', $id)
            ->orderBy('name', 'asc')
            ->get();
    }
}
