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

// Public Route
Route::post('/login', 'AuthenticationController@login')->name('login');

// Private Routes
Route::middleware('auth:api')->group(function() {
    Route::get('/logout', 'AuthenticationController@logout')->name('logout');
});
