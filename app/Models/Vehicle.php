<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory,SoftDeletes;

    public $guarded =  ['id'];
    protected $with = ['manufacturer','brandmodel','color'];
    public function gallary():HasMany
    {
        return $this->hasMany(Gallary::class);
    }

    public function manufacturer():hasOne
    {
        return $this->hasOne(Manufacturer::class,'id','manufacturer_id');
    }

    public function brandmodel():HasOne
    {
        return $this->hasOne(BrandModel::class,'id','brand_model_id');
    }
    public function color():HasOne
    {
        return $this->hasOne(Color::class,'id','color_id');
    }

    public function getAllFeaturesAttribute($value){

        return explode(',',$value);

    }

}

