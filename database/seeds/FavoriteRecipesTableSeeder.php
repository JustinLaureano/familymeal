<?php

use App\Models\FavoriteRecipes;
use App\Models\User;
use Illuminate\Database\Seeder;

class FavoriteRecipesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favorite_recipes')->delete();
        DB::statement('ALTER TABLE favorite_recipes AUTO_INCREMENT = 1');

        $users = User::all();

        foreach($users as $user) {
            // Get user recipes
            $recipes = DB::table('recipe')
                ->select('id')
                ->where('user_id', $user->id)
                ->get();

            // Loop all user recipes to create favorites from
            foreach ($recipes as $recipe) {
                // Make ~20% of recipes favorites
                if (rand(0, 10) <= 2) {
                    factory(FavoriteRecipes::class)->create([
                        'recipe_id' => $recipe->id,
                        'user_id' => $user->id
                    ]);
                }
            }
        }
    }
}
