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
        $categories = $request->categories ? explode(',', $request->categories) : null;
        $cuisines = $request->cuisines ? explode(',', $request->cuisines) : null;
        $user = User::find($user_id);
        $user_settings = UserSettings::where('user_id', $user_id)->first();
        $offset = $page == 1 ? 0 : ($page - 1) * intval($user_settings->table_result_limit);

        $recipes = FavoriteRecipes::getUserRecipes([
            'user_id' => $user_id,
            'take' => $user_settings->table_result_limit,
            'offset' => $offset,
            'categories' => $categories,
            'cuisines' => $cuisines
        ]);

        // $recipe_total = FavoriteRecipes::getUserTotal($user_id);
        $recipe_total = FavoriteRecipes::where('favorite_recipes.user_id', $user_id)
            ->leftJoin('recipe', 'favorite_recipes.recipe_id', 'recipe.id')
            ->where('recipe.deleted_at', Null)
            ->when($categories && count($categories), function($query) use($categories) {
                return $query->whereIn('recipe.recipe_category_id', $categories);
            })
            ->when($cuisines && count($cuisines), function($query) use($cuisines) {
                return $query->whereIn('recipe.cuisine_type_id', $cuisines);
            })
            ->count();

        return response(['recipes' => $recipes, 'recipe_total' => $recipe_total], 200);
    }
}
