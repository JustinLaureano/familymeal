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

Route::get('/', 'PublicController@index');

Auth::routes();

Route::get('/home/{page?}', 'HomeController@index')->name('home');
Route::redirect('/categories', '/home/categories');
Route::redirect('/cuisines', '/home/cuisines');
Route::redirect('/favorites', '/home/favorites');
Route::redirect('/import-export', '/home/import-export');
Route::redirect('/meal-planner', '/home/meal-planner');
Route::redirect('/recipe-book', '/home/recipe-book');
Route::redirect('/settings', '/home/settings');
Route::redirect('/shopping-list', '/home/shopping-list');
