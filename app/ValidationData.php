<?php

namespace App;

trait ValidationData
{
    function getValues($val){

        if(is_array($this->input(["$val"]))){
            return  $this->input(["$val"])['value'];
        }else{
            return $this->input(["$val"]);
        }

    }
}
