<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIngredientCategoryForeignKeyToIngredient extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ingredient', function (Blueprint $table) {
            $table->foreign('ingredient_category_id')->references('id')->on('ingredient_category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ingredient', function (Blueprint $table) {
            $table->dropForeign('ingredient_ingredient_category_id_foreign');
        });
    }
}
