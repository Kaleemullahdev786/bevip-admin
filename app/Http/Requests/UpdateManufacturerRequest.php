<?php

namespace App\Http\Requests;

use App\ValidationData;
use Illuminate\Foundation\Http\FormRequest;

class UpdateManufacturerRequest extends FormRequest
{
    use ValidationData;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('update manufacturers');;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'make'=>'required|unique:vehicle_make,make,'.$this->manufacturer->id,
            'picture'=>'nullable|array',
            'picture.*'=>'file|mimes:png,jpg',
            'status'=>'required'
        ];
    }
    public function prepareForvalidation(){

        $this->merge(['status'=>$this->getValues('status')]);


    }
}
