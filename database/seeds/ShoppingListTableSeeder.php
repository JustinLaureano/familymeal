<?php

use App\Models\User;
use App\Models\ShoppingList;
use Illuminate\Database\Seeder;

class ShoppingListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        DB::table('shopping_list')->delete();
        DB::statement('ALTER TABLE shopping_list AUTO_INCREMENT = 1');

        foreach ($users as $user) {
            for ($i = 0; $i < 2; $i++) {
                factory(ShoppingList::class)->create([
                    'user_id' => $user->id
                ]);
            }
        }
    }
}
