<?php

use App\Models\Ingredient;
use App\Models\ShoppingList;
use App\Models\ShoppingListItems;
use Illuminate\Database\Seeder;

class ShoppingListItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $shopping_lists = ShoppingList::all();

        foreach ($shopping_lists as $shopping_list) {
            $ingredients = Ingredient::orderByRaw('RAND()')
                ->take(rand(3, 15))
                ->get();

            for ($i = 0; $i < count($ingredients); $i++) {
                factory(ShoppingListItems::class)->create([
                    'shopping_list_id' => $shopping_list->id,
                    'order' => $i + 1,
                    'ingredient_id' => $ingredients[$i]->id
                ]);
            }
        }
    }
}
