<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\RecipeRatings;
use Faker\Generator as Faker;

$factory->define(RecipeRatings::class, function (Faker $faker) {
    // weighted to give more high scores
    $ratings = [0, 0.5, 1, 1.5, 2, 2.5, 2.5, 3, 3, 3, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4.5, 4.5, 5, 5];
    return [
        'recipe_id' => 1,
        'rating' => $faker->randomElement($ratings),
        'user_id' => 1,
    ];
});
