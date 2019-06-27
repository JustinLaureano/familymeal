<?php

use App\Models\CuisineType;
use Illuminate\Database\Seeder;

class CuisineTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cuisine_type')->delete();
        DB::statement('ALTER TABLE cuisine_type AUTO_INCREMENT = 1');
        $cuisine_types = [
            'American',
            'British',
            'Carribbean',
            'Chinese',
            'French',
            'Greek',
            'Indian',
            'Italian',
            'Japanese',
            'Mediterranean',
            'Mexican',
            'Moroccan',
            'Spanish',
            'Thai',
            'Turkish',
            'Vietnamese'
        ];

        foreach ($cuisine_types as $cuisine_type) {
            CuisineType::create(array(
                'name' => $cuisine_type
            ));
        }
    }
}
