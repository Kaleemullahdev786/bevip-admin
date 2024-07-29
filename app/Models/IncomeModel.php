<?php

/*@Copyright Develope By Hassan sadiq-2022 | develope in bevip.ae*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IncomeModel extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'vehicle_id', 'user_id', 'amount', 'income_cat', 'mileage', 'date', 'income_id', 'tax_percent', 'tax_charge_rs',
    ];
    protected $table = "income";

    public function category()
    {
        return $this->hasOne("App\Models\IncCats", "id", "income_cat")->withTrashed();
    }

    public function vehicle()
    {
        return $this->hasOne("App\Models\Vehicle", "id", "vehicle_id")->withTrashed();
    }
}
