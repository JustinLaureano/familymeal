<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::statement("ALTER TABLE users AUTO_INCREMENT = 1");
        User::create(array(
            'name'     => 'Justin Laureano',
            'email'    => 'gravatron87@gmail.com',
            'password' => Hash::make('pass'),
            'api_token' => Str::random(60)
        ));
    }
}
