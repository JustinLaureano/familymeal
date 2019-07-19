<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecipeCategory extends Model
{
    use SoftDeletes;
    
    protected $table = 'recipe_category';

    protected $hidden = ['created_at', 'updated_at'];
}
