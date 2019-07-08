<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($page='home')
    {
        $user = Auth::user();
        return view('private/home', [
            'api_token' => $user->api_token, 
            'user_id' => $user->id,
            'page' => $page,
        ]);
    }

    public function logout()
    {
        return redirect('')->with(Auth::logout());
    }
}
