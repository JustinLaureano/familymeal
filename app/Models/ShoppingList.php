<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingList extends Model
{
    protected $table = 'shopping_list';

    protected $hidden = ['created_at', 'updated_at'];
}
