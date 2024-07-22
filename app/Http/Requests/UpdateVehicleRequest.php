<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('update vehicles');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required',
            'nos'=>'required',
            'horse_power'=>'required',
            'nod'=>'required',
            'engine_type'=>'required',
            'gear_type'=>'required',
            'manufacturer_id'=>'required',
            'brand_model_id'=>'required',
            'color_id'=>'required',
            'features'=>'required',
            'category_id'=>'required',
            'type_id'=>'required',
            'extrakmfee'=>'required',
            'depositfee'=>'required',
            'discount'=>'required',
            'status'=>'required',
            'gallary'=>'nullable|array|file',
            'car_description'=>'required',
            'banner'=>'nullable|array|file',
            'video_option'=>'nullable|array',
            // 'video_option.*'=>'file|mimes:mp4',

            'license_plate'=>'required',
            'year'=>'required',
            'luggage'=>'required',
            'reg_exp_date'=>'required',
            'lic_exp_date'=>'required',
        ];
    }

    public function prepareForvalidation(){

        //
        // dd($this->all());
        if(isset($this->input(['status'])['label'])){
            $this->merge(['status'=>$this->input(['status'])['label']]);
        };

        if(is_array($this->input(['manufacturer']))){
            $this->merge(['manufacturer_id'=>
            $this->input(['manufacturer'])['value']]);
        }else{
            $this->merge(['manufacturer_id'=>$this->input(['manufacturer'])]);
        }


        $this->merge(['manufacturer_id'=>$this->getValues('manufacturer')]);
        $this->merge(['engine_type'=>$this->getValues('engine_type')]);
        $this->merge(['gear_type'=>$this->getValues('gear_type')]);
        $this->merge(['brand_model_id'=>$this->getValues('models')]);
        $this->merge(['color_id'=>$this->getValues('color')]);
        $this->merge(['type_id'=>$this->getValues('type')]);
        $this->merge(['category_id'=>$this->getValues('category')]);
        $this->merge(['depositfee'=>$this->input(['deposit_fee'])]);
        $this->merge(['extrakmfee'=>$this->input(['extra_charges'])]);
        $this->merge(['car_description'=>$this->input(['car_description'])]);
        $this->merge(['nos'=>$this->input(['seats'])]);
        $this->merge(['nod'=>$this->input(['doors'])]);
        $this->merge(['lic_exp_date'=> Carbon::parse($this->lic_exp_date)->format('Y-m-d')]);
        $this->merge(['reg_exp_date'=>Carbon::parse($this->reg_exp_date)->format('Y-m-d')]);

    }


    function getValues($val){

        if(is_array($this->input(["$val"]))){
            return  $this->input(["$val"])['value'];
        }else{
            return $this->input(["$val"]);
        }

    }

}
