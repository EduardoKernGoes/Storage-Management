<?php

use App\Http\Controllers\api\ClientController;
use App\Http\Controllers\api\PartnerController;
use App\Http\Controllers\api\ProductController;
use Illuminate\Support\Facades\Route;

Route::apiResource('clients', ClientController::class);
Route::apiResource('partners', PartnerController::class);
Route::apiResource('products', ProductController::class);