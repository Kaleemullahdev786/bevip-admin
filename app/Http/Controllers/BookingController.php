<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Model\BookingIncome;
use App\Model\BookingPaymentsModel;
use App\Model\Hyvikk;
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
        $bookings = Booking::withTrashed()->with(['customer','vehicle'])->where('created_at','<',now()->addMinutes(-2)->format('Y-m-d H:i:s'))->get();

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


    public function updateBooking(Booking $booking)
    {


        // dd($booking);
        // $record = Booking::withTrashed()->find($id);
        $booking->is_confirmed =1;
        $booking->save();


        // dd($record);


        return redirect()->route('bookings')->withErrors(['success' => 'Booking confirmed successfully']);
    }

    public function cancelBooking(Booking $booking)
    {


        $booking->status =0;
        $booking->ride_status = "Cancelled";
        $booking->reason = $request->reason;
        $booking->save();


        // When Status is cancelled then only delete button will be shown

        // delete record from the income model income
        //


        return redirect()->route('bookings')->withErrors(['success' => 'Booking Cancelled']);
    }

    public function completeBooking(Booking $booking)
    {


        $booking->status = 1;
        $booking->ride_status = "Completed";
        $booking->save();


        return redirect()->route('bookings')->withErrors(['success' => 'Booking status completed successfully']);
    }

    public function completePaymentBooking(Request $request)
    {



        $booking = Booking::find($request->get("booking_id"));

        $booking->setMeta([
            'customerId' => $request->get('customerId'),
            'vehicleId' => $request->get('vehicleId'),
            'day' => $request->get('day'),
            'mileage' => $request->get('mileage'),
            'waiting_time' => $request->get('waiting_time'),
            'date' => $request->get('date'),
            'total' => round($request->get('total'), 2),
            'total_kms' => $request->get('mileage'),
            // 'ride_status' => 'Completed',
            'tax_total' => round($request->get('tax_total'), 2),
            'total_tax_percent' => round($request->get('total_tax_charge'), 2),
            'total_tax_charge_rs' => round($request->total_tax_charge_rs, 2),
        ]);
        $booking->is_confirmed = 1;
        $booking->save();

        $id = IncomeModel::create([
            "vehicle_id" => $request->get("vehicleId"),
            // "amount" => $request->get('total'),
            "user_id" => $request->get("customerId"),
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
        $xx = Booking::whereId($request->get("booking_id"))->first();
        // $xx->status = 1;
        $xx->receipt = 1;
        $xx->save();

        if (Hyvikk::email_msg('email') == 1) {
            Mail::to($booking->customer->email)->send(new CustomerInvoice($booking));
        }


        //make post request to an api //
        $url = 'https://api.beviparena.com/api/confirmbooking';
        $data = array(
            'bookingid' => $request->get("booking_id"),
            'userid' => Auth::user()->id,
            'password' => Auth::user()->password
        );

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
                             "User-Agent: PHP\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
                'ignore_errors' => true // Capture error response in file_get_contents
            ),
        );

        $context  = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);

        if ($result === FALSE) {
            // Handle error appropriately
            $error = error_get_last();
            echo "HTTP request failed. Error was: " . $error['message'];
        } else {
            // Process the response
            echo $result;
        }



        return redirect()->route('bookings')->withErrors(['success' => 'Booking payment updated successfully']);





    }


}
