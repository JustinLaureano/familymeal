<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\ShoppingListItems;
use Faker\Generator as Faker;

$factory->define(ShoppingListItems::class, function (Faker $faker) {
    return [
        'shopping_list_id' => 1
    ];
});
