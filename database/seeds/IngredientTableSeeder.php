<?php

use App\Models\Ingredient;
use App\Libraries\IngredientCsv as DefaultIngredients;
use Illuminate\Database\Seeder;

class IngredientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        DB::table('ingredient')->delete();
        DB::statement('ALTER TABLE ingredient AUTO_INCREMENT = 1');

        DefaultIngredients::csv_to_database();
    }
}
