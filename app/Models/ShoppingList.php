<?php

namespace App\Models;

use App\Models\ShoppingListItems;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ShoppingList extends Model
{
    protected $table = 'shopping_list';

    protected $hidden = ['updated_at'];

    public static function getUserShoppingLists($user_id)
    {
        $shopping_lists = DB::table('shopping_list')
            ->select('shopping_list.id',
                'shopping_list.name',
                'shopping_list.created_at'
            )
            ->where('shopping_list.user_id', $user_id)
            ->get();

        foreach ($shopping_lists as $list) {
            $items = DB::table('shopping_list_items')
                ->select(
                    'shopping_list_items.id',
                    'shopping_list_id',
                    'order',
                    'ingredient_id',
                    'ingredient.name AS ingredient_name'
                )
                ->leftJoin('ingredient', 'shopping_list_items.ingredient_id', 'ingredient.id')
                ->where('shopping_list_items.shopping_list_id', $list->id)
                ->get();

            $list->items = $items;
        }

        return $shopping_lists;
    }
}
