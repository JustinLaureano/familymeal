<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteRecipes extends Model
{
    protected $table = 'favorite_recipes';

    protected $hidden = ['created_at', 'updated_at'];
}
