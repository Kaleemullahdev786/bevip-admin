<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class RegisterRequest extends FormRequest
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
            'email' => ['required'   
            , Rule::unique('customers')->where(function ($query){
                // dd($this->email);
                    return $query->whereNull('deleted_at')->where('email',$this->email);
                }),],
            'first_name' => ['required','string'],
            'last_name' => ['required','string'],
            'phone' => ['required','numeric'],
            'password' => ['required','string','min:6']
        ];
    }
}
