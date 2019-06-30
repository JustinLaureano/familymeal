<?php

use App\Models\MeasurementUnits;
use Illuminate\Database\Seeder;

class MeasurementUnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('measurement_units')->delete();
        DB::statement('ALTER TABLE measurement_units AUTO_INCREMENT = 1');
        $measurement_units = [
            ['name' => 'each', 'measurement_system' => 'Universal', 'measurement_type' => 'Volume', 'aliases' => 'ea, ea., Ea., x'],
            ['name' => 'teaspoon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'tsp, tps.,'],
            ['name' => 'tablespoon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'tbl, tbl., tbs, tbs., tbsp., tbsp.'],
            ['name' => 'fluid ounce', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'fl oz, fl. oz., fluid oz, fluid oz.'],
            ['name' => 'cup', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'c, c.'],
            ['name' => 'pint', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'p, p., pt, pt., fl pt, fl. pt., fl pt.'],
            ['name' => 'quart', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'q, q., qt, qt., fl qt, fl. qt., fl qt.'],
            ['name' => 'gallon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'g, g., gal, gal.'],
            ['name' => 'mL', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'milliliter, ml'],
            ['name' => 'liter', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'l'],
            ['name' => 'dL', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'dl'],
            ['name' => 'pound', 'measurement_system' => 'US', 'measurement_type' => 'Mass/Weight', 'aliases' => 'lb, lb., #'],
            ['name' => 'ounce', 'measurement_system' => 'US', 'measurement_type' => 'Mass/Weight', 'aliases' => 'oz, oz., onze'],
            ['name' => 'mg', 'measurement_system' => 'Metric', 'measurement_type' => 'Mass/Weight', 'aliases' => 'milligram, milligramme'],
            ['name' => 'g', 'measurement_system' => 'Metric', 'measurement_type' => 'Mass/Weight', 'aliases' => 'gram, gramme'],
            ['name' => 'kg', 'measurement_system' => 'Metric', 'measurement_type' => 'Mass/Weight', 'aliases' => 'kilogram, kilogramme'],
        ];

        foreach ($measurement_units as $measurement_unit) {
            MeasurementUnits::create(array(
                'name' => $measurement_unit['name'],
                'measurement_system' => $measurement_unit['measurement_system'],
                'measurement_type' => $measurement_unit['measurement_type'],
                'aliases' => $measurement_unit['aliases']
            ));
        }
    }
}
