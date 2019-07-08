<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
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
