<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserTableSeeder::class,
            CuisineTypeTableSeeder::class,
            MeasurementUnitsTableSeeder::class,
            IngredientCategoryTableSeeder::class,
            IngredientSubcategoryTableSeeder::class,
            RecipeCategoryTableSeeder::class,
            RecipeTableSeeder::class,
            RecipeDirectionsTableSeeder::class,
            RecipeNotesTableSeeder::class,
            RecipeSummaryTableSeeder::class,
        ]);
    }
}
