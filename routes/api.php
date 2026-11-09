<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConstructorController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TenderController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PaymentWebhookController;
use App\Http\Controllers\Api\MpesaPaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ============================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================
Route::get('/test', function() {
    return response()->json(['message' => 'API is working!']);
});

Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');

// Public browsing
Route::get('/constructors', [ConstructorController::class, 'index'])->name('api.constructors.index');
Route::get('/constructors/{slug}', [ConstructorController::class, 'show'])->name('api.constructors.show');
Route::get('/projects', [ProjectController::class, 'index'])->name('api.projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('api.projects.show');
Route::get('/tenders', [TenderController::class, 'index'])->name('api.tenders.index');
Route::get('/tenders/{id}', [TenderController::class, 'show'])->name('api.tenders.show');
Route::get('/search', [SearchController::class, 'search'])->name('api.search');

// Payment webhook (public)
Route::post('/payments/webhook', [PaymentWebhookController::class, 'handle'])->name('api.payments.webhook');
Route::post('/payments/mpesa/callback', [MpesaPaymentController::class, 'callback'])->name('api.payments.mpesa.callback');

// ============================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================
Route::middleware(['auth:sanctum'])->group(function () {

    // Auth & User
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::get('/user', [AuthController::class, 'user'])->name('api.user');
    Route::put('/profile', [ProfileController::class, 'update'])->name('api.profile.update');

    // ============================================================
    // CONSTRUCTOR ROUTES
    // ============================================================
    Route::prefix('constructor')->name('api.constructor.')->group(function () {
        Route::get('/profile', [ConstructorController::class, 'profile'])->name('profile');
        Route::put('/profile', [ConstructorController::class, 'updateProfile'])->name('profile.update');
        Route::post('/profile/logo', [ConstructorController::class, 'uploadLogo'])->name('profile.logo');
        Route::post('/profile/cover', [ConstructorController::class, 'uploadCover'])->name('profile.cover');
        Route::get('/dashboard', [ConstructorController::class, 'dashboard'])->name('dashboard');
        Route::get('/analytics', [ConstructorController::class, 'analytics'])->name('analytics');
        Route::get('/reviews', [ReviewController::class, 'constructorReviews'])->name('reviews');

        // Project management
        Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');
        Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        // Project images
        Route::post('/projects/{projectId}/images', [ProjectController::class, 'uploadImage'])->name('projects.images.upload');
        Route::delete('/projects/{projectId}/images/{imageId}', [ProjectController::class, 'deleteImage'])->name('projects.images.delete');
    });

    // ============================================================
    // CLIENT ROUTES
    // ============================================================
    Route::prefix('client')->name('api.client.')->group(function () {
        Route::get('/profile', [ClientController::class, 'profile'])->name('profile');
        Route::put('/profile', [ClientController::class, 'updateProfile'])->name('profile.update');
        Route::get('/dashboard', [ClientController::class, 'dashboard'])->name('dashboard');

        // Client's own tenders
        Route::get('/tenders', [TenderController::class, 'clientTenders'])->name('tenders.index');
        Route::post('/tenders', [TenderController::class, 'store'])->name('tenders.store');
        Route::get('/tenders/{id}', [TenderController::class, 'show'])->name('tenders.show');
        Route::put('/tenders/{id}', [TenderController::class, 'update'])->name('tenders.update');
        Route::delete('/tenders/{id}', [TenderController::class, 'destroy'])->name('tenders.destroy');
        Route::post('/tenders/{tenderId}/apply', [TenderController::class, 'apply'])->name('tenders.apply');

        // Favorites
        Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/favorites/{constructorId}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
        Route::delete('/favorites/{constructorId}', [FavoriteController::class, 'remove'])->name('favorites.remove');
    });

    // ============================================================
    // MESSAGES
    // ============================================================
    Route::prefix('messages')->name('api.messages.')->group(function () {
        Route::get('/', [MessageController::class, 'index'])->name('index');
        Route::get('/conversations', [MessageController::class, 'conversations'])->name('conversations');
        Route::get('/{id}', [MessageController::class, 'show'])->name('show');
        Route::post('/', [MessageController::class, 'store'])->name('store');
        Route::put('/{id}/read', [MessageController::class, 'markAsRead'])->name('read');
        Route::delete('/{id}', [MessageController::class, 'destroy'])->name('destroy');
    });

    // ============================================================
    // NOTIFICATIONS
    // ============================================================
    Route::prefix('notifications')->name('api.notifications.')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::get('/unread', [NotificationController::class, 'unreadCount'])->name('unread');
        Route::put('/{id}/read', [NotificationController::class, 'markAsRead'])->name('read');
        Route::put('/read-all', [NotificationController::class, 'markAllAsRead'])->name('readAll');
        Route::delete('/{id}', [NotificationController::class, 'destroy'])->name('destroy');
    });

    // ============================================================
    // SUBSCRIPTIONS
    // ============================================================
    Route::prefix('subscriptions')->name('api.subscriptions.')->group(function () {
        Route::get('/', [SubscriptionController::class, 'index'])->name('index');
        Route::get('/plans', [SubscriptionController::class, 'plans'])->name('plans');
        Route::post('/', [SubscriptionController::class, 'subscribe'])->name('subscribe');
        Route::post('/{id}/cancel', [SubscriptionController::class, 'cancel'])->name('cancel');
        Route::get('/history', [SubscriptionController::class, 'history'])->name('history');
    });

    // ============================================================
    // REVIEWS (General)
    // ============================================================
    Route::prefix('reviews')->name('api.reviews.')->group(function () {
        Route::get('/{constructorId}', [ReviewController::class, 'constructorReviews'])->name('constructor');
        Route::post('/', [ReviewController::class, 'store'])->name('store');
        Route::delete('/{id}', [ReviewController::class, 'destroy'])->name('destroy');
    });

    // ============================================================
    // PAYMENTS
    // ============================================================
    Route::post('/payments/initiate', [PaymentController::class, 'initiate']);
    Route::get('/payments/status/{reference}', [PaymentController::class, 'status']);
    Route::get('/payments/{method}/redirect/{reference}', [PaymentController::class, 'redirect']);
    Route::post('/payments/mpesa/initiate', [MpesaPaymentController::class, 'initiate']);

    // ============================================================
    // ADMIN ROUTES (with role:admin middleware)
    // ============================================================
    Route::prefix('admin')->name('api.admin.')->middleware(['role:admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/stats', [AdminController::class, 'stats'])->name('stats');

        Route::get('/users', [AdminController::class, 'users'])->name('users.index');
        Route::get('/users/{id}', [AdminController::class, 'showUser'])->name('users.show');
        Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('users.delete');
        Route::put('/users/{id}/suspend', [AdminController::class, 'suspendUser'])->name('users.suspend');
        Route::put('/users/{id}/activate', [AdminController::class, 'activateUser'])->name('users.activate');

        Route::get('/constructors', [AdminController::class, 'constructors'])->name('constructors.index');
        Route::get('/constructors/{id}', [AdminController::class, 'showConstructor'])->name('constructors.show');
        Route::put('/constructors/{id}/approve', [AdminController::class, 'approveConstructor'])->name('constructors.approve');
        Route::put('/constructors/{id}/suspend', [AdminController::class, 'suspendConstructor'])->name('constructors.suspend');
        Route::delete('/constructors/{id}', [AdminController::class, 'deleteConstructor'])->name('constructors.delete');

        Route::get('/subscriptions', [AdminController::class, 'subscriptions'])->name('subscriptions.index');
        Route::get('/subscriptions/{id}', [AdminController::class, 'showSubscription'])->name('subscriptions.show');
        Route::put('/subscriptions/{id}', [AdminController::class, 'updateSubscription'])->name('subscriptions.update');
        Route::delete('/subscriptions/{id}', [AdminController::class, 'deleteSubscription'])->name('subscriptions.delete');

        Route::get('/tenders', [AdminController::class, 'tenders'])->name('tenders.index');
        Route::get('/tenders/{id}', [AdminController::class, 'showTender'])->name('tenders.show');
        Route::put('/tenders/{id}', [AdminController::class, 'updateTender'])->name('tenders.update');
        Route::delete('/tenders/{id}', [AdminController::class, 'deleteTender'])->name('tenders.delete');

        Route::get('/payments', [AdminController::class, 'payments'])->name('payments.index');
        Route::get('/payments/{id}', [AdminController::class, 'showPayment'])->name('payments.show');
        Route::put('/payments/{id}/refund', [AdminController::class, 'refundPayment'])->name('payments.refund');

        Route::get('/reports', [AdminController::class, 'reports'])->name('reports.index');
        Route::get('/reports/users', [AdminController::class, 'userReport'])->name('reports.users');
        Route::get('/reports/revenue', [AdminController::class, 'revenueReport'])->name('reports.revenue');
        Route::get('/reports/activity', [AdminController::class, 'activityReport'])->name('reports.activity');

        Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
        Route::put('/settings', [AdminController::class, 'updateSettings'])->name('settings.update');
        Route::get('/system-info', [AdminController::class, 'systemInfo'])->name('system');
    });

    // Admin verification for constructors (can be placed inside admin group or separate)
    Route::put('/admin/constructors/{id}/verify', [ConstructorController::class, 'verify'])->middleware(['role:admin']);
});