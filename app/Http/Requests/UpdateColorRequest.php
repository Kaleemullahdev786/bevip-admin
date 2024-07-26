<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateColorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return  auth()->user()->hasPermissionTo('update colors');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // dd($this->color->id);
        return [
            'colors'=>'required|unique:vehicle_colors,color,'.$this->color->id,
            'code'=>'required|string',
            'status'=>'required'
        ];
    }

    public function prepareForvalidation(){

        if(isset($this->input(['status'])['label'])){
            $this->merge(['status'=>$this->input(['status'])['label']]);
        };


        // $this->merge(['color1'=>$this->input('colors')]);


    }
}
