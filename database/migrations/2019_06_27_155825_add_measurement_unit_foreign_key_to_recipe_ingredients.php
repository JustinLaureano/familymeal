<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMeasurementUnitForeignKeyToRecipeIngredients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipe_ingredients', function (Blueprint $table) {
            $table->foreign('measurement_unit_id')->references('id')->on('measurement_units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recipe_ingredients', function (Blueprint $table) {
            $table->dropForeign('recipe_ingredients_measurement_unit_id_foreign');
        });
    }
}
