<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipeController extends Controller
{

    public function index()
    {

    }


    public function store(Request $request)
    {

    }

    public function show($id)
    {
        $recipes = Recipe::where('user_id', $id)
                    ->orderBy('name', 'asc')
                    ->take(50)
                    ->get();
        return response($recipes, 200);
    }

    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {

    }
}
