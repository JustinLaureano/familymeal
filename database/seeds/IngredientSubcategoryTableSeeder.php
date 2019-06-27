<?php


use App\Models\IngredientSubcategory;
use Illuminate\Database\Seeder;

class IngredientSubcategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredient_subcategory')->delete();
        DB::statement('ALTER TABLE ingredient_subcategory AUTO_INCREMENT = 1');
        $ingredient_subcategories = [
            // Beverages
            ['name' => 'Alcoholic', 'ingredient_category_id' => 1],
            ['name' => 'Coffee and Tea', 'ingredient_category_id' => 1],
            ['name' => 'Sugary Drinks', 'ingredient_category_id' => 1],
            ['name' => 'Water', 'ingredient_category_id' => 1],
            // Condiments
            ['name' => 'Dips', 'ingredient_category_id' => 2],
            ['name' => 'Spreads', 'ingredient_category_id' => 2],
            ['name' => 'Dressings', 'ingredient_category_id' => 2],
            ['name' => 'Sauces/Gravies', 'ingredient_category_id' => 2],
            // Dairy
            ['name' => 'Cheese', 'ingredient_category_id' => 3],
            ['name' => 'Milk', 'ingredient_category_id' => 3],
            ['name' => 'Yogurt', 'ingredient_category_id' => 3],
            // Fats and Oils
            ['name' => 'Butter and Margarine', 'ingredient_category_id' => 4],
            ['name' => 'Chips', 'ingredient_category_id' => 4],
            ['name' => 'Crackers', 'ingredient_category_id' => 4],
            ['name' => 'Snacks', 'ingredient_category_id' => 4],
            // Fruit
            ['name' => 'Berries', 'ingredient_category_id' => 5],
            ['name' => 'Dried Fruit', 'ingredient_category_id' => 5],
            ['name' => 'Exotic', 'ingredient_category_id' => 5],
            ['name' => 'Fresh Fruit', 'ingredient_category_id' => 5],
            ['name' => 'Fruit Juice', 'ingredient_category_id' => 5],
            // Grains
            ['name' => 'Bars', 'ingredient_category_id' => 6],
            ['name' => 'Breads', 'ingredient_category_id' => 6],
            ['name' => 'Breakfast Breads', 'ingredient_category_id' => 6],
            ['name' => 'Cereal', 'ingredient_category_id' => 6],
            ['name' => 'Pasta', 'ingredient_category_id' => 6],
            ['name' => 'Rice', 'ingredient_category_id' => 6],
            // Proteins
            ['name' => 'Deli/Cured Meats', 'ingredient_category_id' => 7],
            ['name' => 'Eggs', 'ingredient_category_id' => 7],
            ['name' => 'Game', 'ingredient_category_id' => 7],
            ['name' => 'Nuts', 'ingredient_category_id' => 7],
            ['name' => 'Organs', 'ingredient_category_id' => 7],
            ['name' => 'Poultry', 'ingredient_category_id' => 7],
            ['name' => 'Pork', 'ingredient_category_id' => 7],
            ['name' => 'Red Meat', 'ingredient_category_id' => 7],
            ['name' => 'Seafood', 'ingredient_category_id' => 7],
            // Spices
            ['name' => 'Spicy', 'ingredient_category_id' => 8],
            ['name' => 'Earthy', 'ingredient_category_id' => 8],
            ['name' => 'Sharp/Strong', 'ingredient_category_id' => 8],
            ['name' => 'Sweet', 'ingredient_category_id' => 8],
            ['name' => 'Salty', 'ingredient_category_id' => 8],
            ['name' => 'Dried Herbs', 'ingredient_category_id' => 8],
            // Vegetables
            ['name' => 'Allium', 'ingredient_category_id' => 9],
            ['name' => 'Beans/Legumes', 'ingredient_category_id' => 9],
            ['name' => 'Canned', 'ingredient_category_id' => 9],
            ['name' => 'Colorful', 'ingredient_category_id' => 9],
            ['name' => 'Dehydrated', 'ingredient_category_id' => 9],
            ['name' => 'Flowers', 'ingredient_category_id' => 9],
            ['name' => 'Green', 'ingredient_category_id' => 9],
            ['name' => 'Marrow', 'ingredient_category_id' => 9],
            ['name' => 'Root', 'ingredient_category_id' => 9],
            ['name' => 'Starchy', 'ingredient_category_id' => 9],
            ['name' => 'Vegetable Juice', 'ingredient_category_id' => 9],
        ];

        foreach ($ingredient_subcategories as $ingredient_subcategory) {
            IngredientSubcategory::create(array(
                'name' => $ingredient_subcategory['name'],
                'ingredient_category_id' => $ingredient_subcategory['ingredient_category_id']
            ));
        }
    }
}
