<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IngredientCategory extends Model
{
    use SoftDeletes;
    protected $table = 'ingredient_category';
}
