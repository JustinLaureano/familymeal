<?php

namespace App\Http\Controllers;

use App\Libraries\IngredientCsv;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        IngredientCsv::txt_to_csv();
    }
}
