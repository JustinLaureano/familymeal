<?php

use App\Models\RecipeCategory;
use Illuminate\Database\Seeder;

class RecipeCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recipe_category')->delete();
        DB::statement('ALTER TABLE recipe_category AUTO_INCREMENT = 1');
        $recipe_categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Appetizer', 'Dessert', 'Drink', 'Alcohol', 'Holiday'];

        foreach ($recipe_categories as $category) {
            RecipeCategory::create(array(
                'name' => $category
            ));
        }
    }
}