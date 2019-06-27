<?php

use App\Models\IngredientCategory;
use Illuminate\Database\Seeder;

class IngredientCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredient_category')->delete();
        DB::statement('ALTER TABLE ingredient_category AUTO_INCREMENT = 1');
        $ingredient_categories = [
            'Beverages',
            'Condiments',
            'Dairy',
            'Fats/Oils',
            'Fruit',
            'Grains',
            'Protein',
            'Spices',
            'Vegetables',
        ];

        foreach ($ingredient_categories as $ingredient_category) {
            IngredientCategory::create(array(
                'name' => $ingredient_category
            ));
        }
    }
}
