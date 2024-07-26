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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('full_name')->virtualAs("CONCAT(first_name, ' ', last_name)");
            $table->string('email');
            $table->string('password');
            $table->string('phone');
            $table->string('gender');
            $table->string('address');
            $table->string('id_front_image')->nullable();
            $table->string('id_back_image')->nullable();
            $table->string('driving_front_image')->nullable();
            $table->string('driving_back_image')->nullable();
            $table->string('passport_front_image')->nullable();
            $table->string('passport_back_image')->nullable();
            $table->boolean('is_verfied')->default(true);
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
