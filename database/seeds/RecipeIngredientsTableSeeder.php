<?php

use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\RecipeIngredients;
use Illuminate\Database\Seeder;

class RecipeIngredientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipe_count = Recipe::count();

        DB::table('recipe_ingredients')->delete();
        DB::statement('ALTER TABLE recipe_ingredients AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $recipe_count; $i++) {
            $num_of_ingredients = rand(2, 12);
            
            for ($j = 1; $j <= $num_of_ingredients; $j++) {
                $is_recipe_ingredient = rand(1, 10) <= 1;

                if ($is_recipe_ingredient) {
                    $random_recipe = Recipe::inRandomOrder()->first();
                    $ingredient_id = NULL;
                    $ingredient_recipe_id = $random_recipe->id;
                }
                else {
                    $random_ingredient = Ingredient::inRandomOrder()->first();
                    $ingredient_id = $random_ingredient->id;
                    $ingredient_recipe_id = NULL;
                }

                factory(RecipeIngredients::class)->create([
                    'recipe_id' => $i,
                    'order' => $j,
                    'ingredient_id' => $ingredient_id,
                    'ingredient_recipe_id' => $ingredient_recipe_id,
                ]);
            }
        }
    }
}
