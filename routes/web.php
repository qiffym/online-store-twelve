<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');
});

Route::resource('categories', Controllers\CategoryController::class)
    ->scoped(['category' => 'slug']);
Route::resource('products', Controllers\ProductController::class)
    ->scoped(['product' => 'slug']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
