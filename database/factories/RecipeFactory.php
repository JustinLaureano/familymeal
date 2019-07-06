<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Recipe;
use App\Models\RecipeCategory;
use App\Models\CuisineType;
use Faker\Generator as Faker;

$factory->define(Recipe::class, function (Faker $faker) {
    $recipe_categories = RecipeCategory::select('id')->get();
    $cuisine_types = CuisineType::select('id')->get();

    return [
        'name' => $faker->words(rand(1, 5), true),
        'user_id' => 1,
        'recipe_category_id' => $faker->randomElement($recipe_categories),
        'cuisine_type_id' => $faker->randomElement($cuisine_types),
    ];
});
