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
            UserSettingsTableSeeder::class,
            CuisineTypeTableSeeder::class,
            MeasurementUnitsTableSeeder::class,
            IngredientCategoryTableSeeder::class,
            IngredientSubcategoryTableSeeder::class,
            IngredientTableSeeder::class,
            RecipeCategoryTableSeeder::class,
            RecipeTableSeeder::class,
            RecipeIngredientsTableSeeder::class,
            RecipeDirectionsTableSeeder::class,
            RecipeNotesTableSeeder::class,
            RecipeRatingsTableSeeder::class,
            RecipeSummaryTableSeeder::class,
            FavoriteRecipesTableSeeder::class,
            ShoppingListTableSeeder::class,
            ShoppingListItemsTableSeeder::class,
        ]);
    }
}
