<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use App\Models\ShoppingListItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShoppingListController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $shopping_list_id)
    {
        $updates = [];
        $response = null;
        $shopping_list = ShoppingList::find($shopping_list_id);

        // new item
        if ($request->post('add')) {
            $shopping_list_items = ShoppingListItems::where('shopping_list_id', $shopping_list_id)->get();
            $order = ShoppingListItems::select()
                ->where('shopping_list_id', $shopping_list_id)
                ->max('order') + 1;

            $new_item = $request->post('add');

            // check if already in shopping list
            $duplicate = false;
            foreach ($shopping_list_items as $item) {
                if ($item->ingredient_id == $new_item['ingredient_id']) {
                    $duplicate = true;
                    break;
                }
            }

            // dont add if ingredient is already in list
            if ($duplicate) {
                $data = ['shopping_list_id' => $shopping_list_id, 'error' => 'ingredient already exists'];
                return response($data, 200);
            }

            // save new item
            $shopping_list_item = new ShoppingListItems;
            $shopping_list_item->shopping_list_id = $shopping_list_id;
            $shopping_list_item->order = $order;
            $shopping_list_item->ingredient_id = $new_item['ingredient_id'];
            $shopping_list_item->save();

            $updates[] = 'add';
            $response = ShoppingListItems::getById($shopping_list_item->id);
        }

        if (count($updates))
            $shopping_list->save();

        $data = ['shopping_list_id' => $shopping_list_id, 'updates' => $updates];

        if ($response) 
            $data['response'] = $response;

        return response($data, 200);
    }

    public function destroy($id)
    {
        ShoppingList::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
