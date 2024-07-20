<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
class Customer extends Authenticatable  implements JWTSubject
{
    use HasFactory, Notifiable;
    protected $guarded = ['id'];
    protected $guard = 'customers';
    
    protected $hidden = ['password'];
    public function getJWTIdentifier()
    {         
        return $this->getKey();     
    }
    public function getJWTCustomClaims()
    {         
        return [];
    } 
    
    
}
