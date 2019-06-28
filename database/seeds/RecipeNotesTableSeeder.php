<?php

use App\Models\Recipe;
use App\Models\RecipeNotes;
use Illuminate\Database\Seeder;

class RecipeNotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipe_count = Recipe::count();

        DB::table('recipe_notes')->delete();
        DB::statement('ALTER TABLE recipe_notes AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $recipe_count; $i++) {
            $random = rand(0, 100);
            $num_of_notes = ( $random < 5)  ? rand(2, 3) : ( $random < 30 ) ? 1 : 0; 
            for ($j = 1; $j <= $num_of_notes; $j++) {
                factory(RecipeNotes::class)->create([
                    'recipe_id' => $i,
                    'order' => $j
                ]);
            }
        }
    }
}
