<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function success($error_type,$message,$code =200)
    {
        return json_encode(['error'=>$error_type,'message'=>$message],$code);
    }
}
