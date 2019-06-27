<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\RecipeDirections;
use Faker\Generator as Faker;

$factory->define(RecipeDirections::class, function (Faker $faker) {
    return [
        'recipe_id' => 1,
        'order' => 1,
        'direction' => $faker->words(rand(5, 28), true)
    ];
});
