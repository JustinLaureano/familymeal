<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingListItems extends Model
{
    protected $table = 'shopping_list_items';

    protected $hidden = ['created_at', 'updated_at'];
}
