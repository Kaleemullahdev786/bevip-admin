<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('user', [AuthController::class, 'user']);
    Route::post('providerregistration', [ProfileController::class, 'providerRegistration']);
    Route::post('change-profile-names', [ProfileController::class, 'changeName']);
    Route::post('change-password', [ProfileController::class, 'changePassword']);
    Route::post('change-email', [ProfileController::class, 'changeEmail']);
    Route::post('send-code', [ProfileController::class, 'sendCode']);
    Route::post('delete-account', [ProfileController::class, 'delete']);
    Route::post('refresh-token', [AuthController::class, 'refresh']);

});