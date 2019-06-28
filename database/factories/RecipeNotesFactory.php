<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\RecipeNotes;
use Faker\Generator as Faker;

$factory->define(RecipeNotes::class, function (Faker $faker) {
    return [
        'recipe_id' => 1,
        'order' => 1,
        'note' => $faker->words(rand(6, 15), true)
    ];
});
