<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Http\Requests\StorePaymentSettingRequest;
use App\Http\Requests\UpdatePaymentSettingRequest;
use Inertia\Inertia;

class PaymentSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view payment_settings');
        if(!$hasPermission){
            abort(403);
        }
        $payment_settings = PaymentSetting::get();
        return Inertia::render('Utils/PaymentSettings/index', ['payment_settings' => $payment_settings]);
    }
 /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create Payment Setting');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/PaymentSettings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentSettingRequest $request)
    {

        $data = $request->validated();
        // $image = $this->common->upload($data['image'][0],'packages');
        // $data['image_name'] = $image[1];
        // $data['image'] = $image[0];

        PaymentSetting::create($data);
        return to_route('payment_settings')->withErrors('success','Payment Setting created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(PaymentSetting $payment_setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentSetting $payment_setting)
    {
        return Inertia::render('Utils/PaymentSettings/Edit', ['payment_setting' => $payment_setting]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentSettingRequest $request, PaymentSetting $payment_setting)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update payment_settings');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();

        $payment_setting->update($data);
        return to_route('payment_settings')->withErrors('success','Payment Setting updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentSetting $payment_setting)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete payment_settings');
        if(!$hasPermission){
            abort(403);
        }
        $payment_setting = PaymentSetting::find($id);
        // $this->common->deleteImageFromDir($package->image,'payment_settings');
        $payment_setting->delete();


        return redirect()->route('payment_settings')->withErrors(['success' => 'Payment Setting deleted successfully']);
    }



    public function block($id)
    {
        $payment_setting = PaymentSetting::find($id);
        if($payment_setting->status == 'blocked'){
            $payment_setting->status = 'active';
        }else{
        $payment_setting->status = 'blocked';
        }
        $payment_setting->save();


        return redirect()->route('payment_settings')->withErrors(['success' => 'Payment Setting status updated successfully']);
    }

}
