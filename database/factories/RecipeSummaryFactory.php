<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\RecipeSummary;
use Faker\Generator as Faker;

$factory->define(RecipeSummary::class, function (Faker $faker) {
    return [
        'recipe_id' => 1,
        'summary' => $faker->words(rand(8, 24), true)
    ];
});
