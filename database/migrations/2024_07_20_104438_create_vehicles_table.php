<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('manufacture_id');
            $table->unsignedBigInteger('brand_model_id');
            $table->unsignedBigInteger('color_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('type_id');
            $table->string('image');
            $table->string('video')->nullable();
            $table->integer('nos');
            $table->integer('nod');

            $table->integer('luggage');
            $table->string('gear_type');
            $table->string('year');
            $table->date('lic_exp_date');
            $table->date('reg_exp_date');
            $table->string('engine_type');
            $table->string('horse_power');
            $table->string('vin')->default(0);
            $table->string('license_plate')->nullable();
            $table->integer('mileage')->nullable();
            $table->string('all_features');
            $table->integer('in_service')->default(0);
            $table->integer('int_mileage')->nullable();
            $table->integer('drent')->nullable();
            $table->integer('wrent')->nullable();
            $table->integer('mrent')->nullable();
            $table->decimal('extrakmfee',10,2);
            $table->decimal('depositfee',10,2);
            $table->integer('discount')->nullable();
            $table->integer('rating')->default(0);
            $table->text('car_description')->nullable();
            $table->integer('total_rating_count')->default(0);
            $table->string('status')->default('active');
            $table->foreign('manufacture_id')->references('id')->on('manufacturers');
            $table->foreign('brand_model_id')->references('id')->on('brand_models');
            $table->foreign('color_id')->references('id')->on('colors');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('type_id')->references('id')->on('types');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
