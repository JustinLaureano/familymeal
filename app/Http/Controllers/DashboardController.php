<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show($user_id) {
        $recipes = Recipe::where('user_id', $user_id)->get();
    }
}
