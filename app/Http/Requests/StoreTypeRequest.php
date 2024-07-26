<?php

namespace App\Http\Requests;

use App\ValidationData;
use Illuminate\Foundation\Http\FormRequest;

class StoreTypeRequest extends FormRequest
{
    use ValidationData;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermissionTo('create types');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'displayname'=>'required',
            'seats'=>'required',
            'vehicletype'=>'required',
            'noofdoor'=>'required',
            'icon'=>'required|required',
            'icon.*'=>'file|mimes:png,jpg',
            'status'=>'required'
        ];
    }

    public function prepareForvalidation(){


            $this->merge(['status'=>$this->getValues('status')]);
            $this->merge(['displayname'=>$this->input('name')]);
            $this->merge(['vehicletype'=>$this->input('type')]);
            $this->merge(['noofdoor'=>$this->input('doors')]);


    }
}
