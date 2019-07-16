<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Recipe;
use App\Models\RecipeCategory;
use App\Models\CuisineType;
use Faker\Generator as Faker;

$factory->define(Recipe::class, function (Faker $faker) {
    $recipe_categories = RecipeCategory::select('id')->get();
    $cuisine_types = CuisineType::select('id')->get();
    $difficulties = ['Easy', 'Medium', 'Hard'];
    $portions = ['single', '1-2', '2-3', '2-4', '5-6', '4-6', '6-8', '8-10', '10-12', '5 people', '15-20'];
    $time_amount = ['1 minute', '5 mins', '2 minutes', '5-10 minutes', '15 minutes', '15-20 minutes', '20 minutes', 
                    '30 minutes', '45-60 minutes', '1 hour', '1 hr', '1-2 hours', '4-6 hours', '8-10 hours'];

    return [
        'name' => $faker->words(rand(1, 5), true),
        'user_id' => 1,
        'recipe_category_id' => $faker->randomElement($recipe_categories),
        'cuisine_type_id' => $faker->randomElement($cuisine_types),
        'difficulty' => $faker->randomElement($difficulties),
        'portions' => $faker->randomElement($portions),
        'prep_time' => $faker->randomElement($time_amount),
        'cook_time' => $faker->randomElement($time_amount)
    ];
});
