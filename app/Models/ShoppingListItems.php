<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ShoppingListItems extends Model
{
    protected $table = 'shopping_list_items';

    protected $hidden = ['created_at', 'updated_at'];

    public static function getByShoppingListId($shopping_list_id) {
        return DB::table('shopping_list_items')
            ->select(
                'shopping_list_items.id',
                'shopping_list_id',
                'order',
                'ingredient_id',
                'ingredient.name AS ingredient_name'
            )
            ->leftJoin('ingredient', 'shopping_list_items.ingredient_id', 'ingredient.id')
            ->where('shopping_list_items.shopping_list_id', $shopping_list_id)
            ->get();
    }

    public static function getById($shopping_list_item_id) {
        return DB::table('shopping_list_items')
            ->select(
                'shopping_list_items.id',
                'shopping_list_id',
                'order',
                'ingredient_id',
                'ingredient.name AS ingredient_name'
            )
            ->leftJoin('ingredient', 'shopping_list_items.ingredient_id', 'ingredient.id')
            ->where('shopping_list_items.id', $shopping_list_item_id)
            ->first();
    }
}
