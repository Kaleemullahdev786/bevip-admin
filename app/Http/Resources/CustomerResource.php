<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'fullname'=>$this->first_name.' '. $this->last_name,
            'email'=>$this->email,
            'token'=>$this->token,
            'phone'=>$this->phone
        ];
    }
}
