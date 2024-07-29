<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kodeine\Metable\Metable;

class Booking extends Model
{
    use HasFactory,SoftDeletes;
    use Metable;
    /*
    * Vehicle Details
    **/

    public function vehicle():HasOne
    {
        return $this->hasOne(Vehicle::class, "id", "vehicle_id")->withTrashed();
    }


    /*
    * Customer Details
    **/
    public function customer():HasOne
    {
        return $this->hasOne(User::class, "id", "customer_id")->withTrashed();
    }


    public function getIsVisibleAttribute(){
// date_default_timezone_set('Asia/Dubai');
        // dd($this->created_at->format('H:i:s'),now()->format("H:i:s"));
        return $this->is_visible = $this->created_at->diff(now())->i >2 ?true:false ;

    }


}
