<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class BrandModel extends Model
{
    use HasFactory,SoftDeletes;

    public $guarded =  ['id'];
    protected $table = 'vehicle_model';
    public function manufacturer() :BelongsTo
    {

        return $this->BelongsTo(Manufacturer::class,'make_id','id');

    }
}
