<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UtilsController;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\BedroomsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\CrewController;
use App\Http\Controllers\AmenitiesController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\FreeUtilsController;
use App\Http\Controllers\YachtController;
use App\Http\Controllers\PerkController;
use App\Http\Controllers\PackageController;
use App\Models\User;


Route::get('/', [AuthController::class, 'index'])->name('login');
//auth controller//
Route::post('/login', [AuthController::class, 'login'])->name('login');
//logout//
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
//dashboard controller//
Route::get('/dashboard', [DashboardController::class, 'dashboardIndex'])->name('dashboard');

//roles controller//
Route::get('/dashboard/roles', [RolesController::class, 'index'])->name('roles');
Route::get('/dashboard/roles/create', [RolesController::class, 'create'])->name('roles.create');
Route::get('/dashboard/roles/permissions/{id}', [RolesController::class, 'permissions'])->name('roles.permissions');
Route::post('/dashboard/roles/permissions/{role}/{permission}', [RolesController::class, 'storePermissions'])->name('roles.permissions');
Route::post('/dashboard/roles/store', [RolesController::class, 'store'])->name('roles.store');
Route::get('/dashboard/roles/edit/{id}', [RolesController::class, 'edit'])->name('roles.edit');
Route::post('/dashboard/roles/update/{id}', [RolesController::class, 'update'])->name('roles.update');
Route::get('/dashboard/roles/delete/{id}', [RolesController::class, 'delete'])->name('roles.delete');


//utills controller//
// Permission::create(['name' => 'create packages']);
// Permission::create(['name' => 'view packages']);
// Permission::create(['name' => 'update packages']);
// Permission::create(['name' => 'delete packages']);
//delete FROM `permissions` WHERE name NOT in('permissions users','block users','delete users', 'view users','create users','update users', 'view roles','create roles','update roles','delete roles','update permissions');


//Users Routes //
Route::get('/dashboard/users', [UsersController::class, 'index'])->name('users');
Route::get('/dashboard/users/create', [UsersController::class, 'create'])->name('users.create');
Route::post('/dashboard/users/store', [UsersController::class, 'store'])->name('users.store');
Route::get('/dashboard/users/edit/{id}', [UsersController::class, 'edit'])->name('users.edit');
Route::post('/dashboard/users/update/{id}', [UsersController::class, 'update'])->name('users.update');
Route::get('/dashboard/users/delete/{id}', [UsersController::class, 'delete'])->name('users.delete');
Route::get('/dashboard/users/block/{id}', [UsersController::class, 'block'])->name('users.block');
Route::post('/dashboard/users/permissions/{userid}/{permissionid}', [UsersController::class, 'permissions'])->name('users.permissions');


// Colors Routes
Route::get('/dashboard/colors', [ColorController::class, 'index'])->name('colors');
Route::get('/dashboard/colors/create', [ColorController::class, 'create'])->name('colors.create');
Route::post('/dashboard/colors/store', [ColorController::class, 'store'])->name('colors.store');
Route::get('/dashboard/colors/edit/{id}', [ColorController::class, 'edit'])->name('colors.edit');
Route::post('/dashboard/colors/update/{id}', [ColorController::class, 'update'])->name('colors.update');
Route::get('/dashboard/colors/delete/{id}', [ColorController::class, 'delete'])->name('colors.delete');
Route::get('/dashboard/colors/block/{id}', [ColorController::class, 'block'])->name('colors.block');










