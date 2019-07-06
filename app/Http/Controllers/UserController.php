<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
    }

    public function init($id)
    {
        $recipes = Recipe::where('user_id', $id)->orderBy('name', 'asc')->get();

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
