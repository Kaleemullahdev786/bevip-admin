<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreManufacturerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('create manufacturers');;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'make'=>'required|unique:vehicle_make,make',
            'picture'=>'required|array',
            'picture.*'=>'file|mimes:png,jpg',
            'status'=>'required'
        ];
    }
    public function prepareForvalidation(){

        if(isset($this->input(['status'])['label'])){
            $this->merge(['status'=>$this->input(['status'])['label']]);
        };

    }
}
