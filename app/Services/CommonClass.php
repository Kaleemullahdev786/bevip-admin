<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
class CommonClass
{
    /**
     * Create a new class instance.
     */



    public function extractValues($values)
    {

        return array_column($values, 'label');

    }


    public function extractValuesFromArray($values,$column)
    {

        if(is_array($values))
        return array_column($values, $column);
       else
       return $values;


    }



    function uploadImages($images,$id,$dir,$fk)
    {

    // dd($images,$dir,$id,$fk);

        $uimages = array();
        if(is_array($images)){

            foreach($images as $key => $image){
                $image = $this->upload($image,$dir);
                $uimages[] = ['image'=>$image[0],'order_number'=>$key +1,"$fk"=>$id];
            }
        }
        return $uimages;

    }

    public function checkDir($dir){

        $path = public_path().'/assets/'.$dir;

        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }

        // File::isDirectory($path) or File::makeDirectory($path, 0777, true, true);

    }

    public function upload($object,$dir)
    {
        $this->checkDir($dir);
       if($object){

            $amenityImage = Image::make($object);
            $ofilename = $object->getClientOriginalName();
            $filename = str_replace(' ', '_', $ofilename);
            $uniqueFilename = uniqid() . '_' . $filename;
            $destinationPath = public_path("/assets/".$dir);
            $amenityImage->save($destinationPath . '/' . $uniqueFilename);
            return  [asset('/assets/'.$dir).'/'.$uniqueFilename,$filename];

        }
    }

    public function deleteImageFromDir($image,$dir){


        $imagename = explode('/', $image);
        // Delete from the directory
        if (count($imagename) > 4) {
            $path  = public_path('assets/' . $dir . '/' . $imagename[5]);
            if (file_exists($path)) {
                unlink($path);
            }
        }

        return true;

    }

    function convertIntoArray($value_array){
        if(empty($value_array))
       return [];
        return array_map(function($item){
            return ['value'=>ucfirst($item),'label'=>ucfirst($item)];
        },$value_array);
    }

}
