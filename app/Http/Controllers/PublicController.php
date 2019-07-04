<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublicController extends Controller
{
    public function index()
    {
        if (Auth::check())
            return redirect()->intended('home');
        else
            return view('public/welcome');
    }
}
