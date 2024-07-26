<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'carname'=>'required',
            'nos'=>'required',
            'horse_power'=>'required',
            'nod'=>'required',
            'engine_type'=>'required',
            'gear_type'=>'required',
            'make_id'=>'required',
            'model_id'=>'required',
            'color_id'=>'required',
            'features'=>'required',
            'group_id'=>'required',
            'type_id'=>'required',
            'extrakmfee'=>'required',
            'depositfee'=>'required',
            'discount'=>'required',
            'status'=>'required',
            'gallary'=>'nullable|array',
            // 'car_description'=>'required',
            'banner'=>'required|array',
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

        if(isset($this->input(['status'])['label'])){
            $this->merge(['status'=>$this->input(['status'])['label']]);
        };

        $this->merge(['make_id'=>
        $this->input(['manufacturer'])['value']]);


        $this->merge(['engine_type'=>
        $this->input(['engine_type'])['value']]);

        $this->merge(['gear_type'=>
        $this->input(['gear_type'])['value']]);


        $this->merge(['model_id'=>
        $this->input(['models'])['value']]);

        $this->merge(['color_id'=>
        $this->input(['color'])['value']]);

        $this->merge(['type_id'=>
        $this->input(['type'])['value']]);


        $this->merge(['group_id'=>
        $this->input(['category'])['value']]);


        $this->merge(['depositfee'=>
        $this->input(['deposit_fee'])]);



        $this->merge(['extrakmfee'=>
        $this->input(['extra_charges'])]);

        // $this->merge(['car_description'=>
        // $this->input(['car_description'])]);


        $this->merge(['nos'=>
        $this->input(['seats'])]);


        $this->merge(['carname'=>
        $this->input('name')]);

        $this->merge(['nod'=>
        $this->input(['doors'])]);

        // $this->merge(['luggage'=>1]);
        $this->merge(['lic_exp_date'=> Carbon::parse($this->lic_exp_date)->format('Y-m-d')]);
        $this->merge(['reg_exp_date'=>Carbon::parse($this->reg_exp_date)->format('Y-m-d')]);

        // dd($this->all());





    }

}
