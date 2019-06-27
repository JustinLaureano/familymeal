<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Recipe;
use Faker\Generator as Faker;

$factory->define(Recipe::class, function (Faker $faker) {
    return [
        'name' => $faker->words(rand(1, 5), true),
        'user_id' => 1,
    ];
});
