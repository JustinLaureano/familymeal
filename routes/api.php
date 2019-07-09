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
        // 'recipes' => 'RecipeController',
        'user' => 'UserController',
    ]);
    
    Route::get('/recipes/{id}/', 'RecipeController@index');
    Route::get('/recipe/{id}', 'RecipeController@show');
    Route::post('/recipes/store', 'RecipeController@store');
    Route::post('/recipes/{id}/update', 'RecipeController@update');
    Route::post('/recipes/{id}/delete', 'RecipeController@destroy');
    
    Route::get('/init/{id}', 'UserController@init');
    Route::post('/logout', 'HomeController@logout');
});