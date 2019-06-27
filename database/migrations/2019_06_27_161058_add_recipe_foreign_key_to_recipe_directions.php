<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRecipeForeignKeyToRecipeDirections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipe_directions', function (Blueprint $table) {
            $table->foreign('recipe_id')->references('id')->on('recipe');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recipe_directions', function (Blueprint $table) {
            $table->dropForeign('recipe_directions_recipe_id_foreign');
        });
    }
}
