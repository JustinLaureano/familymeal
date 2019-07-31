<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\FavoriteRecipes;
use Faker\Generator as Faker;

$factory->define(FavoriteRecipes::class, function (Faker $faker) {
    return [
        'recipe_id' => 1,
        'user_id' => 1
    ];
});
