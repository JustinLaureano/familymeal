<?php

use App\Models\Recipe;
use App\Models\RecipeSummary;
use Illuminate\Database\Seeder;

class RecipeSummaryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipe_count = Recipe::count();

        DB::table('recipe_summary')->delete();
        DB::statement('ALTER TABLE recipe_summary AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $recipe_count; $i++) {
            factory(RecipeSummary::class)->create([
                'recipe_id' => $i
            ]);
        }
    }
}
