<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 120);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_category_id')->nullable();
            $table->unsignedBigInteger('cuisine_type_id')->nullable();
            $table->string('difficulty', 10)->nullable();
            $table->string('portions', 20)->nullable();
            $table->string('prep_time', 20)->nullable();
            $table->string('cook_time', 20)->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe');
    }
}
