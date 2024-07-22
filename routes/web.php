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
use App\Http\Controllers\BrandModelController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\FreeUtilsController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\YachtController;
use App\Http\Controllers\PerkController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\VehicleController;
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
Route::get('/dashboard/colors/edit/{color}', [ColorController::class, 'edit'])->name('colors.edit');
Route::post('/dashboard/colors/update/{color}', [ColorController::class, 'update'])->name('colors.update');
Route::get('/dashboard/colors/delete/{color}', [ColorController::class, 'delete'])->name('colors.delete');
Route::get('/dashboard/colors/block/{color}', [ColorController::class, 'block'])->name('colors.block');
Route::get('/dashboard/colors/restored/{id}', [ColorController::class, 'restored'])->name('colors.block');
// Features Routes
Route::get('/dashboard/features', [FeatureController::class, 'index'])->name('features');
Route::get('/dashboard/features/create', [FeatureController::class, 'create'])->name('features.create');
Route::post('/dashboard/features/store', [FeatureController::class, 'store'])->name('features.store');
Route::get('/dashboard/features/edit/{feature}', [FeatureController::class, 'edit'])->name('features.edit');
Route::post('/dashboard/features/update/{feature}', [FeatureController::class, 'update'])->name('features.update');
Route::get('/dashboard/features/delete/{feature}', [FeatureController::class, 'delete'])->name('features.delete');
Route::get('/dashboard/features/block/{feature}', [FeatureController::class, 'block'])->name('features.block');
Route::get('/dashboard/features/restored/{id}', [FeatureController::class, 'restored'])->name('features.block');

// Manufacturers Routes
Route::get('/dashboard/manufacturers', [ManufacturerController::class, 'index'])->name('manufacturers');
Route::get('/dashboard/manufacturers/create', [ManufacturerController::class, 'create'])->name('manufacturers.create');
Route::post('/dashboard/manufacturers/store', [ManufacturerController::class, 'store'])->name('manufacturers.store');
Route::get('/dashboard/manufacturers/edit/{manufacturer}', [ManufacturerController::class, 'edit'])->name('manufacturers.edit');
Route::post('/dashboard/manufacturers/update/{manufacturer}', [ManufacturerController::class, 'update'])->name('manufacturers.update');
Route::get('/dashboard/manufacturers/delete/{manufacturer}', [ManufacturerController::class, 'delete'])->name('manufacturers.delete');
Route::get('/dashboard/manufacturers/block/{manufacturer}', [ManufacturerController::class, 'block'])->name('manufacturers.block');
Route::get('/dashboard/manufacturers/restored/{id}', [ManufacturerController::class, 'restored'])->name('manufacturers.block');


Route::get('/dashboard/brand_models', [BrandModelController::class, 'index'])->name('brand_models');
Route::get('/dashboard/brand_models/create', [BrandModelController::class, 'create'])->name('brand_models.create');
Route::post('/dashboard/brand_models/store', [BrandModelController::class, 'store'])->name('brand_models.store');
Route::get('/dashboard/brand_models/edit/{brand_model}', [BrandModelController::class, 'edit'])->name('brand_models.edit');
Route::post('/dashboard/brand_models/update/{brand_model}', [BrandModelController::class, 'update'])->name('brand_models.update');
Route::get('/dashboard/brand_models/delete/{brand_model}', [BrandModelController::class, 'delete'])->name('brand_models.delete');
Route::get('/dashboard/brand_models/block/{brand_model}', [BrandModelController::class, 'block'])->name('brand_models.block');
Route::get('/dashboard/brand_models/restored/{id}', [BrandModelController::class, 'restored'])->name('brand_models.block');


Route::get('/dashboard/types', [TypeController::class, 'index'])->name('types');
Route::get('/dashboard/types/create', [TypeController::class, 'create'])->name('types.create');
Route::post('/dashboard/types/store', [TypeController::class, 'store'])->name('types.store');
Route::get('/dashboard/types/edit/{type}', [TypeController::class, 'edit'])->name('types.edit');
Route::post('/dashboard/types/update/{type}', [TypeController::class, 'update'])->name('types.update');
Route::get('/dashboard/types/delete/{type}', [TypeController::class, 'delete'])->name('types.delete');
Route::get('/dashboard/types/block/{type}', [TypeController::class, 'block'])->name('types.block');
Route::get('/dashboard/types/restored/{id}', [TypeController::class, 'restored'])->name('types.block');


// categories Routes

Route::get('/dashboard/categories', [CategoryController::class, 'index'])->name('categories');
Route::get('/dashboard/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/dashboard/categories/store', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/dashboard/categories/edit/{category}', [CategoryController::class, 'edit'])->name('categories.edit');
Route::post('/dashboard/categories/update/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::get('/dashboard/categories/delete/{category}', [CategoryController::class, 'delete'])->name('categories.delete');
Route::get('/dashboard/categories/block/{category}', [CategoryController::class, 'block'])->name('categories.block');
Route::get('/dashboard/categories/restored/{id}', [CategoryController::class, 'restored'])->name('categories.block');
// Vechile Routes
Route::get('/dashboard/vehicles', [VehicleController::class, 'index'])->name('vehicles');
Route::get('/dashboard/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
Route::post('/dashboard/vehicles/store', [VehicleController::class, 'store'])->name('vehicles.store');
Route::get('/dashboard/vehicles/edit/{vehicle}', [VehicleController::class, 'edit'])->name('vehicles.edit');
Route::post('/dashboard/vehicles/update/{vehicle}', [VehicleController::class, 'update'])->name('vehicles.update');
Route::get('/dashboard/vehicles/delete/{vehicle}', [VehicleController::class, 'delete'])->name('vehicles.delete');
Route::get('/dashboard/vehicles/block/{vehicle}', [VehicleController::class, 'block'])->name('vehicles.block');
Route::get('/dashboard/vehicles/restored/{id}', [VehicleController::class, 'restored'])->name('vehicles.block');

//utills controller//
// Permission::create(['name' => 'create vehicles']);
// Permission::create(['name' => 'view vehicles']);
// Permission::create(['name' => 'update vehicles']);
// Permission::create(['name' => 'delete vehicles']);
// Permission::create(['name' => 'status vehicles']);
//delete FROM `permissions` WHERE name NOT in('permissions users','block users','delete users', 'view users','create users','update users', 'view roles','create roles','update roles','delete roles','update permissions');







