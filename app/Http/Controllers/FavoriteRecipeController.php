<?php

namespace App\Http\Controllers;

use App\Models\FavoriteRecipes;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Http\Request;

class FavoriteRecipeController extends Controller
{
    public function index(Request $request, $user_id)
    {
        $page = $request->page ? intval($request->page) : 1;
        $user = User::find($user_id);
        $user_settings = UserSettings::where('user_id', $user_id)->first();
        $offset = $page == 1 ? 0 : ($page - 1) * intval($user_settings->table_result_limit);

        $recipes = FavoriteRecipes::getUserRecipes([
            'user_id' => $user_id,
            'take' => $user_settings->table_result_limit,
            'offset' => $offset,
        ]);

        $recipe_total = FavoriteRecipes::getUserTotal($user_id);

        return response(['recipes' => $recipes, 'recipe_total' => $recipe_total], 200);
    }
}
