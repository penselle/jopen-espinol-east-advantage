<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\UserAPIController;
use App\Http\Controllers\API\RoleAPIController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    
    Route::get('create-user', [UserController::class, 'create']);
    Route::get('users', [UserController::class, 'show']);

    
    Route::get('roles', [RoleAPIController::class, 'show']);
    Route::get('get-users', [UserAPIController::class, 'show']);
    Route::post('store-user', [UserAPIController::class, 'store']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
