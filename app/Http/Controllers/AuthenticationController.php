<?php

namespace App\Http\Controllers;

use Cookie;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Lcobucci\JWT\Parser;

class AuthenticationController extends Controller
{
    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;

            $cookie_data = ['token' => $token, 'user_id' => $user->id];
            $cookie = Cookie::make('rc-web-auth-token', json_encode($cookie_data), 30);

            $response = [
                'token' => $token,
                'user' => $user
            ];
            
            return response($response, 200)->cookie($cookie);
        }
        else {
            $response = 'Email and/or Password is incorrect.';
            return response($response, 422);
        }
    }

    public function logout(Request $request) {
        $value = $request->bearerToken();
        $id = (new Parser())->parse($value)->getHeader('jti');
        $token = $request->user()->tokens->find($id);
        $token->revoke();

        Cookie::forget('rc-web-auth-token');

        $response = 'You have successfully logged out.';
        return response($response, 200);
    }
}
