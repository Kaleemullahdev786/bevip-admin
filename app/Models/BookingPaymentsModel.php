<?php

/*@Copyright Develope By Hassan sadiq-2022 | develope in bevip.ae*/

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class BookingPaymentsModel extends Model
{
    protected $table = "booking_payments";
    protected $fillable = ['booking_id', 'method', 'amount', 'payment_details', 'transaction_id', 'payment_status','deposit_fee','additional_fee'];

    public function booking()
    {
        return $this->hasOne("App\Model\Bookings", "id", "booking_id")->withTrashed();
    }
}
