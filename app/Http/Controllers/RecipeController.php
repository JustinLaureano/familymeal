<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\User;
use App\Models\UserSettings;

class RecipeController extends Controller
{

    public function index(Request $request)
    {

    }


    public function store(Request $request)
    {

    }

    public function show(Request $request, $id)
    {
        $page = $request->page ? intval($request->page) : 1;
        $user = User::find($id);
        $user_settings = UserSettings::where('user_id', $id)->first();
        $offset = ($page == 1 ? 1 : $page - 1) * intval($user_settings->table_result_limit);

        $recipes = Recipe::where('user_id', $id)
                    ->where('deleted_at', Null)
                    ->orderBy('name', 'asc')
                    ->offset($offset)
                    ->take($user_settings->table_result_limit)
                    ->get();

        $data = [
            'id' => $id,
            'page' => $page,
            'user_id' => $user,
            'user_settings' => $user_settings,
            'offset' => $offset
        ];

        return response(['recipes' => $recipes], 200);
        // return response($data, 200);
    }

    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {
        Recipe::find($id)->delete();
        return response(['id' => $id], 200);
    }
}
