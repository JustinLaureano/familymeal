<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    protected $table = 'user_settings';

    protected $fillable = [
        'table_result_limit'
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    protected $dates = [
        'created_at', 'updated_at'
    ];
}
