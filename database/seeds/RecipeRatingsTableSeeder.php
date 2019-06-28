<?php

use App\Models\Recipe;
use App\Models\RecipeRatings;
use Illuminate\Database\Seeder;

class RecipeRatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipe_count = Recipe::count();

        DB::table('recipe_ratings')->delete();
        DB::statement('ALTER TABLE recipe_ratings AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $recipe_count; $i++)
            factory(RecipeRatings::class)->create(['recipe_id' => $i]);
    }
}
