<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\MeasurementUnits;
use App\Models\RecipeIngredients;
use Faker\Generator as Faker;

$factory->define(RecipeIngredients::class, function (Faker $faker) {
    $measurement_units = MeasurementUnits::all();
    $measurement_unit_ids = [];

    foreach ($measurement_units as $measurement_unit)
        $measurement_unit_ids[] = intval($measurement_unit->id);

    return [
        'recipe_id' => 1,
        'ingredient_units' => $faker->numberBetween(1, 500),
        'measurement_unit_id' => $faker->randomElement($measurement_unit_ids),
    ];
});
