<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UserController extends Controller
{

    public function index()
    {
    }

    public function init($id)
    {
        $recipes = DB::table('recipe')
                        ->select('recipe.name', 'recipe.id', 'recipe_category_id', 'recipe_category.name AS recipe_category', 'cuisine_type.name AS cuisine_type', 'recipe.created_at', 'recipe.updated_at')
                        ->leftJoin('recipe_category', 'recipe.recipe_category_id', 'recipe_category.id')
                        ->leftJoin('cuisine_type', 'recipe.cuisine_type_id', 'cuisine_type.id')
                        ->where('user_id', $id)
                        ->where('recipe.deleted_at', Null)
                        ->orderBy('name', 'asc')
                        ->limit(50)
                        ->get();

        $data = [
            'user' => User::where('id', $id)->first(),
            'recipes' => $recipes,
        ];
        return response($data, 200);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return response(User::find($id)->get(), 200);
    }

    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
