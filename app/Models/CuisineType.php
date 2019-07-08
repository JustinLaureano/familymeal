<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CuisineType extends Model
{
    use SoftDeletes;
    protected $table = 'cuisine_type';
}
