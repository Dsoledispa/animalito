<?php

use App\Http\Controllers\NombreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[NombreController::class,'mostrar']);

//leerJS
Route::post('leer',[NombreController::class,'leer']);

//deleteJS
Route::delete('eliminar/{id}',[NombreController::class,'eliminar']);

//createJS
Route::post('crear',[NombreController::class,'crearPost']);

//updateJS
Route::put('actualizar/{id}',[NombreController::class,'actualizar']);