<?php

namespace App\Http\Controllers;

use App\Models\Nombre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NombreController extends Controller
{
    public function mostrar() {
        return view('mostrar');
    }

    public function leer(Request $req) {
        $datos = DB::table('tbl_animales')->join('tbl_chip', 'tbl_animales.id', '=', 'tbl_chip.id_animal')->where('nombre','like',$req['filtro'].'%')->get();
        return response()->json($datos);
    }

    public function eliminar($id) {
        try {
            DB::beginTransaction();
            DB::table('tbl_chip')->where('id','=',$id)->delete();
            DB::table('tbl_animales')->where('id','=',$id)->delete();
            DB::commit();
        }catch(\Exception $e) {
            DB::rollback();
            return $e->getMessage();
        }
        return view('mostrar');
    }

    public function crearPost(Request $req){
        $datos = $req->except('_token','_method');
        try{
            $id=DB::table('tbl_animales')->insertGetId(["nombre"=>$datos['nombre'],"peso"=>$datos['peso']]);
            DB::table('tbl_chip')->insert(["id_animal"=>$id,"num_serie"=>$datos['num_serie']]);
            return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th) {
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    }

    public function actualizar(Request $req, $id){
        $datos = $req->except('_token','_method');
        try{
            DB::beginTransaction();
            DB::update('update tbl_chip set num_serie=? where id=?',[$datos['num_serie'],$id]);
            DB::commit();
            return response()->json(array('resultado'=> 'OK'));
        }catch (\Throwable $th) {
            DB::rollback();
            return response()->json(array('resultado'=> 'NOK: '.$th->getMessage()));
        }
    } 
}
