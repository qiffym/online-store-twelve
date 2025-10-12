<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');
});

Route::resource('categories', Controllers\CategoryController::class)
    ->scoped(['category' => 'slug']);
Route::resource('products', Controllers\ProductController::class)
    ->scoped(['product' => 'slug']);
Route::resource('carts', Controllers\CartController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
