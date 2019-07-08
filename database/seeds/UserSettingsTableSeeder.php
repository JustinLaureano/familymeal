<?php

use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Database\Seeder;

class UserSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_count = User::count();

        DB::table('user_settings')->delete();
        DB::statement('ALTER TABLE user_settings AUTO_INCREMENT = 1');

        for ($i = 1; $i <= $user_count; $i++)
            factory(UserSettings::class)->create(['user_id' => $i]);
    }
}
