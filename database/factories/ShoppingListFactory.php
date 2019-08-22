<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\ShoppingList;
use Faker\Generator as Faker;

$factory->define(ShoppingList::class, function (Faker $faker) {
    return [
        'user_id' => 1,
        'name' => $faker->words(rand(1, 4), true)
    ];
});
