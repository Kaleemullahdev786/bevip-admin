<?php

namespace App\Services;
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
    function uploadImages($images,$id)
    {

        $uimages = array();
        if(is_array($images)){

            foreach($images as $key => $image){
                $image = $this->upload($image);
                $uimages[] = ['image'=>$image[0],'order_number'=>$key +1,'yacht_id'=>$id];
            }
        }
        return $uimages;

    }

    public function upload($object,$dir)
    {

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

        
            $imagename = explode('/',$image);
            // Delete from the directory
            $path  = public_path('assets/'.$dir.'/'.$imagename[5]);
            if(file_exists($path)){
                unlink($path);   
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
