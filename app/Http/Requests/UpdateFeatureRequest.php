<?php

namespace App\Http\Requests;

use App\ValidationData;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFeatureRequest extends FormRequest
{
    use ValidationData;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('update features');;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|unique:features,name,'.$this->feature->id,
            'icon'=>'nullable|array',
            'icon.*'=>'file|mimes:png,jpg',
            'status'=>'required'
        ];
    }
    public function prepareForvalidation(){

        $this->merge(['status'=>$this->getValues('status')]);



    }
}
