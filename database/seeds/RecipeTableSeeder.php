<?php

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recipe')->delete();
        DB::statement('ALTER TABLE recipe AUTO_INCREMENT = 1');
        factory(Recipe::class, 155)->create();
    }
}
