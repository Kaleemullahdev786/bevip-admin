<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Mail\CustomerInvoice;
use App\Models\BookingIncome;
use App\Models\BookingPaymentsModel;
use App\Models\IncomeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {

        $hasPermission = auth()->user()->hasPermissionTo('view bookings');
        if(!$hasPermission){
            abort(403);
        }
        // dd(now()->addMinutes(2)->format('Y-m-d H:i:s'));
        $bookings = Booking::withTrashed()->with(['customer','vehicle','metas'])
        // ->where('created_at','<',now()->addMinutes(-2)->format('Y-m-d H:i:s'))
    //    ->take(2)
        ->paginate(10);

        // dd($bookings[1]);
        return Inertia::render('Utils/Bookings/index', ['bookings' => $bookings]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }





    public function completeBookingJourney(Booking $booking)
    {


        // dd($booking);
        // $record = Booking::withTrashed()->find($id);
        $booking->status =1;
        $booking->ride_status = "Completed";
        $booking->save();


        // dd($record);


        return redirect()->route('bookings')->withErrors(['success' => 'Booking Journey completed successfully']);
    }


    public function completeBookingPayment(Booking $booking)
    {
        $booking->payment =1;
        $booking->save();
        return redirect()->route('bookings')->withErrors(['success' => 'Booking Payment done successfully']);
    }


    public function updateBooking(Booking $booking)
    {


        $booking->is_confirmed =1;
        $booking->save();

        return redirect()->route('bookings')->withErrors(['success' => 'Booking confirmed successfully']);
    }


    public function extraParam(Request $request, Booking $booking)
    {


        // for ($i=0; $i <4 ; $i++) {
        //     $bookings = $booking->replicate();

        //     $metas = $booking->metas()->get();
        //     $bookings->save();


        //     foreach ($metas as $comment) {
        //         $newComment = $comment->replicate();



        //         $newComment->booking_id = $bookings->id; // Associate with the new post
        //         // $newComment->ride_status = 'Upcoming'; // Associate with the new post
        //         // dd($comment,$newComment);
        //         $bookings->setMeta($newComment->toArray());
        //         $bookings->save();
        //     }
        //     dd('dd');

        // }
            dd('Done');


        $booking->ride_status = "Upcoming";
        $booking->reason = $request->reason ??' No reasons';
        $booking->status = 0;
        $booking->payment = 0;
        $booking->is_confirmed = 0;
        $booking->save();

        dd('updated');
    }




    public function cancelBooking(Request $request,  Booking $booking)
    {
        $booking->ride_status = "Cancelled";
        $booking->reason = $request->reason ??' No reasons';
        $booking->status = 0;
        $booking->payment = 0;
        $booking->is_confirmed = 0;

        $booking->save();

        // if booking->status != 1 then delete income record
        IncomeModel::where('income_id', $request->cancel_id)->where('income_cat', 1)->delete();

        //make post request to an api //
        $url = 'realRequest' ; //'https://api.beviparena.com/api/cancelbookingfromadmin';
        // $data = array(
        //     'bookingid' => $booking->id,
        //     'cancelreason' => $request->reason,
        //     'userid' => Auth::user()->id,
        //     'password' => Auth::user()->password
        // );

        // $options = array(
        //     'http' => array(
        //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
        //                      "User-Agent: PHP\r\n",
        //         'method'  => 'POST',
        //         'content' => http_build_query($data),
        //         'ignore_errors' => true // Capture error response in file_get_contents
        //     ),
        // );

        // $context  = stream_context_create($options);
        // $result = @file_get_contents($url, false, $context);

        // if ($result === FALSE) {
        //     // Handle error appropriately
        //     $error = error_get_last();
        //     echo "HTTP request failed. Error was: " . $error['message'];
        // } else {
        //     // Process the response
        //     echo $result;
        // }


        return redirect()->route('bookings')->withErrors(['success' => 'Booking Cancelled']);
    }



    // public function cancelBooking(Booking $booking)
    // {


    //     $booking->status =0;
    //     $booking->ride_status = "Cancelled";
    //     $booking->reason = $request->reason;
    //     $booking->save();


    //     // When Status is cancelled then only delete button will be shown

    //     // delete record from the income model income
    //     //


    //     return redirect()->route('bookings')->withErrors(['success' => 'Booking Cancelled']);
    // }

    public function completeBooking(Booking $booking)
    {


        $booking->status = 1;
        $booking->ride_status = "Completed";
        $booking->save();


        return redirect()->route('bookings')->withErrors(['success' => 'Booking status completed successfully']);
    }

    public function completePaymentBooking(Request $request, Booking $booking)
    {

        // dd($request->all(),$booking);


        // $booking = Booking::find($request->get("booking_id"));

        $booking->setMeta([
            'customerId' => $booking->customer_id,
            'vehicleId' => $booking->vehicle_id,
            'day' => $request->get('day'),
            'mileage' => $request->get('mileage'),
            'waiting_time' => $request->get('waiting_time'),
            'date' => $request->get('date'),
            'total' => round($request->get('total'), 2),
            'total_kms' => $request->get('mileage'),
            'tax_total' => round($request->get('tax_total'), 2),
            'total_tax_percent' => round($request->get('total_tax_charge'), 2),
            'total_tax_charge_rs' => round($request->total_tax_charge_rs, 2),
        ]);
        $booking->is_confirmed = 1;
        $booking->save();

        // dd("Booking update");
        $id = IncomeModel::create([
            "vehicle_id" => $booking->vehicle_id,
            // "amount" => $request->get('total'),
            "user_id" => $booking->customer_id,
            "date" => $request->get('date'),
            "mileage" => $request->get("mileage"),
            "income_cat" => $request->get("income_type"),
            "income_id" => $booking->id,
            "tax_percent" => $request->get('total_tax_charge'),
            "tax_charge_rs" => $request->total_tax_charge_rs,
        ])->id;


        // save booking payments //
        BookingPaymentsModel::where('booking_id' , $booking->id)
        ->update(['payment_status' => "succeeded", 'additional_fee' => $request->get('total'), 'deposit_fee' => $request->get('deposit_fee')]);

        BookingIncome::create(['booking_id' => $request->get("booking_id"), "income_id" => $id]);
        $booking->receipt = 1;
        $booking->save();

        // if (Hyvikk::email_msg('email') == 1) {
        //     Mail::to($booking->customer->email)->send(new CustomerInvoice($booking));
        // }


        // //make post request to an api //
        // $url = 'https://api.beviparena.com/api/confirmbooking';
        // $data = array(
        //     'bookingid' => $request->get("booking_id"),
        //     'userid' => Auth::user()->id,
        //     'password' => Auth::user()->password
        // );

        // $options = array(
        //     'http' => array(
        //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
        //                      "User-Agent: PHP\r\n",
        //         'method'  => 'POST',
        //         'content' => http_build_query($data),
        //         'ignore_errors' => true // Capture error response in file_get_contents
        //     ),
        // );

        // $context  = stream_context_create($options);
        // $result = @file_get_contents($url, false, $context);

        // if ($result === FALSE) {
        //     // Handle error appropriately
        //     $error = error_get_last();
        //     echo "HTTP request failed. Error was: " . $error['message'];
        // } else {
        //     // Process the response
        //     echo $result;
        // }



        return redirect()->route('bookings')->withErrors(['success' => 'Booking payment updated successfully']);




        //   Old function  for  booking


    //     $carid = $request->input('carid');
    //     $pickupaddressid = $request->input('pickupaddressid');   // self or deliver pickup
    //     $returnaddress = $request->input('returnaddress');
    //     $returnaddresslatitude = $request->input('returnaddresslatitude');
    //     $returnaddresslongitude = $request->input('returnaddresslongitude');
    //     $isreturnSelected = $request->input('isreturnSelected');   //  agar checked to ha Kud lani ha
    //     $pickup = $request->input('pickupdateandtime');
    //     $dropof = $request->input('dropofdateandtime');
    //     $bookingtype = $request->input('bookingtype'); // self and deliver
    //     $addons = json_decode($request->input('addons'), true);
    //     $noofdays = $request->input('noofdays');
    //     $totalkmallowed = $request->input('totalkmallowed');  // from vehicle
    //     $membershipdiscount = $request->input('membershipdiscount'); // Calcuation
    //     $discount = $request->input('discount');
    //     $total = floatval($request->input('total')) - (!empty($discount) ? floatval($discount) : 0);
    //     $promoid = $request->input('promoid');
    //     $companyaddressid = $request->input('companyaddressid');
    //     //May 24, 2024 at 3:31 PM// pickup and dropof date format has to be like this "dd-mm-yyyy (24-05-2024)" //
    //     $pickup = Carbon::parse($pickup)->format("Y-m-d H:i:s");
    //     $dropof = Carbon::parse($dropof)->format("Y-m-d H:i:s");
    // // dd($pickup, $dropof);

    // if($pickupaddressid != "undefined"){
    //     AddressModel::where('customer_id', Auth::user()->id)->update(['is_primary' => 'no']);
    //     $addressdata = AddressModel::where('id', $pickupaddressid)->first();
    //     $addressdata->is_primary = "yes";
    //     $addressdata->save();
    // }

    //     $booking = new BookingModel();
    //     $booking->customer_id = Auth::user()->id;
    //     $booking->vehicle_id = $carid;
    //     if($bookingtype == 'Deliver'){
    //             $booking->dest_addr = $addressdata->address;
    //             $booking->pickup_addr = $returnaddress;
    //             $booking->return_latitude = $returnaddresslatitude;
    //             $booking->return_longitude = $returnaddresslongitude;
    //             $booking->issameaddressforreturn = $isreturnSelected == 'true' ? 1 : 0;
    //         }else{
    //             $booking->company_location = $companyaddressid;
    //         }

    //     $booking->address_id = $pickupaddressid == "undefined" ? null : $pickupaddressid;
    //     $booking->pickup = $pickup;
    //     $booking->dropoff = $dropof;

    //     $booking->booking_type = $bookingtype;

    //     $booking->delivery_amount = $bookingtype == 'Deliver' ? SettingsModel::where('name', 'delivery_charges')->first()->value : 0;
    //     $booking->extra_km = $bookingtype == 'Self Pickup' ? SettingsModel::where('name', 'selfpickup')->first()->value : 0;
    //     $booking->noofdays = $noofdays;
    //     $booking->total_km_allowed = $totalkmallowed;
    //     $booking->coupon_id = $promoid == "undefined" ? null : $promoid;
    //     $booking->discount = $discount;
    //     $booking->membership_discount = $membershipdiscount;
    //     $booking->save();

    //     $savebookingpayment = new BookingPaymentsModel();
    //     $savebookingpayment->booking_id = $booking->id;
    //     $savebookingpayment->method = 'cash';
    //     $savebookingpayment->amount = $total;
    //     $savebookingpayment->save();

    //     if($promoid != "undefined"){
    //         $coupon = CouponsModel::where('id', $promoid)->first();
    //         $coupon->no_of_used = $coupon->no_of_used + 1;
    //         $coupon->save();
    //     }

    //     if($addons != null){
    //         foreach($addons as $addon){
    //             $bookingaddon = new BookingAddonsModel();
    //             $bookingaddon->booking_id = $booking->id;
    //             $bookingaddon->addon_id = $addon['id'];
    //             $bookingaddon->qty = $addon['quantity'];
    //             $bookingaddon->amount = $addon['price'];
    //             $bookingaddon->save();
    //         }
    //     }











    }








}
