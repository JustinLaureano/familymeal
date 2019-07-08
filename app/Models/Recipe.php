<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use SoftDeletes;
    protected $table = 'recipe';

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at'
    ];
}
