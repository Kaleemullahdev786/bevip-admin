<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBrandModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('create brand_models');;
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
            'manufacturer_id'=>'required|numeric'
        ];
    }

    public function prepareForvalidation(){

        if(isset($this->input(['status'])['label'])){
            $this->merge(['status'=>$this->input(['status'])['label']]);
        };

        $this->merge(['manufacturer_id'=>
        $this->input(['manufacturer'])['value']]);

    }
}
