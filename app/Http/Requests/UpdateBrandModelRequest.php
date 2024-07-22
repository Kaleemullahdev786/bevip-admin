<?php

namespace App\Http\Requests;

use App\ValidationData;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandModelRequest extends FormRequest
{
    use ValidationData;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('update brand_models');;
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
            'manufacturer_id'=>'required|numeric',
            'status'=>'required'
        ];
    }
    public function prepareForvalidation(){

            $this->merge(['status'=>$this->getValues('status')]);
            $this->merge(['manufacturer_id'=>$this->getValues('manufacturer')]);

    }
}
