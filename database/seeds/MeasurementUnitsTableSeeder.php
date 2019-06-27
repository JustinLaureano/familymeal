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
            ['name' => 'teaspoon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'tsp, tps.,'],
            ['name' => 'tablespoon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'tbl, tbl., tbs, tbs., tbsp., tbsp.'],
            ['name' => 'fluid ounce', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'fl oz, fl. oz., fluid oz, fluid oz.'],
            ['name' => 'cup', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'C, C., c, c.'],
            ['name' => 'pint', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'P, P., p, p., pt, pt., fl pt, fl. pt., fl pt.'],
            ['name' => 'quart', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'Q, Q., q, q., qt, qt., fl qt, fl. qt., fl qt.'],
            ['name' => 'gallon', 'measurement_system' => 'US', 'measurement_type' => 'Volume', 'aliases' => 'G, G., g, g., gal, gal., Gal, Gal.'],
            ['name' => 'mL', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'milliliter, ml, ML'],
            ['name' => 'liter', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'L, l'],
            ['name' => 'dL', 'measurement_system' => 'Metric', 'measurement_type' => 'Volume', 'aliases' => 'dl, DL'],
            ['name' => 'pound', 'measurement_system' => 'US', 'measurement_type' => 'Mass/Weight', 'aliases' => 'lb, LB, lb., LB., #'],
            ['name' => 'ounce', 'measurement_system' => 'US', 'measurement_type' => 'Mass/Weight', 'aliases' => 'oz, OZ, oz., Oz, Oz.'],
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
