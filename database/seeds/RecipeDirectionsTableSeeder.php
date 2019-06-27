<?php

use App\Models\Recipe;
use App\Models\RecipeDirections;
use Illuminate\Database\Seeder;

class RecipeDirectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipe_count = Recipe::count();

        DB::table('recipe_directions')->delete();
        DB::statement('ALTER TABLE recipe_directions AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $recipe_count; $i++) {
            $num_of_directions = rand(2, 12);
            for ($j = 1; $j <= $num_of_directions; $j++) {
                factory(RecipeDirections::class)->create([
                    'recipe_id' => $i,
                    'order' => $j
                ]);
            }
        }

    }
}
