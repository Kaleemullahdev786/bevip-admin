<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarComparison extends Model
{
    use HasFactory;

    public $guarded =  ['id'];
    protected $table = 'vehicle_colors';
}
