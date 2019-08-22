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
            $num_of_lists = rand(1, 4);
            for ($i = 0; $i < $num_of_lists; $i++) {
                factory(ShoppingList::class)->create([
                    'user_id' => $user->id
                ]);
            }
        }
    }
}
