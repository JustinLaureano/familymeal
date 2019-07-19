<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MeasurementUnits extends Model
{
    protected $table = 'measurement_units';

    protected $hidden = ['created_at', 'updated_at'];
}
