<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use App\Models\ShoppingListItems;
use App\Models\UserSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShoppingListController extends Controller
{
    private $new_id_floor = 900000;

    public function index()
    {
        // return user shopping lists
        return response([
            'shopping_lists' => ShoppingList::getUserShoppingLists($user_id)
        ], 200);
    }

    public function store(Request $request)
    {
        $user_id = $request->post('user_id');

        $list_count = ShoppingList::where('user_id', $user_id)->count();
        $user_settings = UserSettings::where('user_id', $user_id)->first();

        if ($user_settings->shopping_list_limit <= $list_count)
            return response(['error' => 'User has reached list limit'], 200);

        $shopping_list = new ShoppingList;
        $shopping_list->user_id = $user_id;
        $shopping_list->name = 'List ' . ($list_count + 1);
        $shopping_list->save();

        // return user shopping lists
        return response([
            'shopping_lists' => ShoppingList::getUserShoppingLists($user_id)
        ], 200);
    }

    public function show($id)
    {

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

        if ($request->post('name')) {
            $shopping_list->name = $request->post('name');
            $shopping_list->save();

            $updates[] = 'name';
            $response = $shopping_list->name;
        }

        if ($request->post('items')) {
            $items = $request->post('items');

            // Check item deletions
            $old_items_ids = ShoppingListItems::select('id')
                ->where('shopping_list_id', $shopping_list_id)
                ->get();

            $new_item_ids = [];
            foreach ($items as $item)
                $new_item_ids[] = $item['id'];

            foreach ($old_items_ids as $old_item)
                if (!in_array($old_item['id'], $new_item_ids))
                    ShoppingListItems::destroy($old_item['id']);

            $order = 1;
            foreach ($items as $item) {
                if ($item['id'] >= $this->new_id_floor) {
                    // New Shopping List Item
                    $shopping_list_item = new ShoppingListItems;
                    $shopping_list_item->shopping_list_id = $shopping_list_id;

                    $order = ShoppingListItems::select()
                        ->where('shopping_list_id', $shopping_list_id)
                        ->max('order') + 1;

                    $shopping_list_item->order = $order;
                    $shopping_list_item->ingredient_id = $item['ingredient_id'];
                    $shopping_list_item->save();
                }
                else {
                    // Update Shopping List Item
                    $shopping_list_item = ShoppingListItems::find($item['id']);
                    $shopping_list_item->order = $order;
                    $shopping_list_item->checked = $item['checked'];
                    $shopping_list_item->save();
                }
                $order++;
            }

            $updates[] = 'items';
            $response = ShoppingListItems::getByShoppingListId($shopping_list_id);
        }

        $shopping_list->save();

        $data = [
            'shopping_list_id' => $shopping_list_id,
            'updates' => $updates
        ];

        if ($response) 
            $data['response'] = $response;

        return response($data, 200);
    }

    public function destroy($id)
    {
        ShoppingListItems::where('shopping_list_id', $id)->delete();
        ShoppingList::find($id)->delete();
        $user = Auth::user();
        return response([
            'id' => $id,
            'shopping_lists' => ShoppingList::getUserShoppingLists($user->id)
        ], 200);
    }
}
