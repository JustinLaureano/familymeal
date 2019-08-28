<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Auth Routes */
Auth::routes();

/* Public Routes */
Route::get('/', 'PublicController@index');
Route::get('/terms', 'PublicController@terms');
Route::get('/privacy', 'PublicController@privacy');

/* Private Routes */
Route::get('/home/{page?}', 'HomeController@index')->name('home');
Route::redirect('/categories', '/home/categories');
Route::redirect('/cuisines', '/home/cuisines');
Route::redirect('/favorites', '/home/favorites');
Route::redirect('/import-export', '/home/import-export');
Route::redirect('/ingredients', '/home/ingredients');
Route::redirect('/meal-planner', '/home/meal-planner');
Route::redirect('/recipe-book', '/home/recipe-book');
Route::redirect('/settings', '/home/settings');
Route::redirect('/shopping-list', '/home/shopping-list');

Route::get('recipe/photo/{image}', function($image = null)
{
    $path = storage_path('uploads/recipe_photos/') . $image;
    if (file_exists($path)) { 
        return Response::download($path);
    }
});



Route::fallback(function () {
    return redirect()->route('home');
});
