<?php

namespace App\Http\Controllers;

use Cookie;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function index() {
        $cookie = isset($_COOKIE['rc-web-auth-token']) ? json_decode($_COOKIE['rc-web-auth-token'], TRUE) : ['token' => '', 'user_id' => null];
        return view('app', [
            'token' => $cookie['token'],
            'user_id' => $cookie['user_id']
        ]);
    }
}
