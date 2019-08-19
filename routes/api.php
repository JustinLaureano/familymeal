<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:api')->group(function() {
    Route::apiResources([
        'user' => 'UserController',
    ]);
    
    Route::get('/init/{id}', 'UserController@init');
    
    /* Recipe Routes */
    Route::get('/recipes/{id}/', 'RecipeController@index');
    Route::get('/search/recipes', 'RecipeController@search');
    Route::get('/favorite-recipes/{id}/', 'FavoriteRecipeController@index');
    Route::get('/recipe/{id}', 'RecipeController@show');
    Route::get('/recipes/count/categories/{user_id}', 'RecipeController@getCountByCategory');

    Route::post('/recipes/store', 'RecipeController@store');
    Route::post('/recipes/{id}/update', 'RecipeController@update');
    Route::post('/recipes/{id}/delete', 'RecipeController@destroy');

    /* Ingredient Routes */
    Route::get('/search/ingredients', 'IngredientController@search');
    Route::get('/ingredient/{id}', 'IngredientController@show');
    Route::get('/ingredients/count/categories/{user_id}', 'IngredientController@getCountByCategory');

    Route::post('/ingredients/store', 'IngredientController@store');
    Route::post('/ingredients/{id}/update', 'IngredientController@update');
    Route::post('/ingredients/{id}/delete', 'IngredientController@destroy');
    
    Route::post('/logout', 'HomeController@logout');
});