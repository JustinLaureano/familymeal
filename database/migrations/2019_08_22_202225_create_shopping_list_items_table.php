<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShoppingListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_list_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('shopping_list_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));

            $table->foreign('shopping_list_id')->references('id')->on('shopping_list');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shopping_list_items', function (Blueprint $table) {
            $table->dropForeign('shopping_list_items_shopping_list_id_foreign');
        });
        Schema::dropIfExists('shopping_list_items');
    }
}
