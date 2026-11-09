<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them
| will be assigned to the "web" middleware group.
|
*/

// ============================================================
// HOME ROUTE - Use your home.blade.php
// ============================================================
Route::get('/', function () {
    return view('home');
})->name('home');

// ============================================================
// AUTHENTICATION ROUTES (Breeze)
// ============================================================
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ============================================================
// ADD YOUR CUSTOM ROUTES HERE
// ============================================================
// Constructor routes
Route::get('/constructors', function () {
    return view('home');
})->name('constructors.index');

Route::get('/constructors/{slug}', function () {
    return view('home');
})->name('constructors.show');

// Project routes
Route::get('/projects', function () {
    return view('home');
})->name('projects.index');

Route::get('/projects/{slug}', function () {
    return view('home');
})->name('projects.show');

// Tender routes
Route::get('/tenders', function () {
    return view('home');
})->name('tenders.index');

Route::get('/tenders/{id}', function () {
    return view('home');
})->name('tenders.show');

// Static pages
Route::get('/about', function () {
    return view('home');
})->name('about');

Route::get('/contact', function () {
    return view('home');
})->name('contact');

Route::get('/pricing', function () {
    return view('home');
})->name('pricing');

// ============================================================
// CATCH-ALL ROUTE - MUST BE LAST!
// ============================================================
Route::get('/{any}', function () {
    return view('home');
})->where('any', '^(?!api|_debugbar|horizon|telescope|nova|storage|images|css|js|fonts|favicon).*$');

require __DIR__.'/auth.php';