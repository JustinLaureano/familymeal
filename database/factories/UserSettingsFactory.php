<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\UserSettings;
use Faker\Generator as Faker;

$factory->define(UserSettings::class, function (Faker $faker) {
    return [
        'user_id' => 1
    ];
});
