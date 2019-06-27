<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIngredientCategoryForeignKeyToIngredientSubcategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ingredient_subcategory', function (Blueprint $table) {
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
        Schema::table('ingredient_subcategory', function (Blueprint $table) {
            $table->dropForeign('ingredient_subcategory_ingredient_category_id_foreign');
        });
    }
}
