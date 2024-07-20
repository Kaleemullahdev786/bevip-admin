<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Http\Requests\StoreCouponRequest;
use App\Http\Requests\UpdateCouponRequest;
use Inertia\Inertia;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view coupons');
        if(!$hasPermission){
            abort(403);
        }
        $coupons = Coupon::get();
        return Inertia::render('Utils/Coupons/index', ['coupons' => $coupons]);
    }

   /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create coupons');
        if(!$hasPermission){
            abort(403);
        }

        return Inertia::render('Utils/Coupons/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponRequest $request)
    {

        $data = $request->validated();
        Coupon::create($data);
        return to_route('coupons')->withErrors('success','Coupon created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {

        return Inertia::render('Utils/Coupons/Edit', ['coupon' => $coupon]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update coupons');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $coupon->update($data);
        return to_route('coupons')->withErrors('success','coupon updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete coupons');
        if(!$hasPermission){
            abort(403);
        }
        $coupon = Coupon::find($id);
        $coupon->delete();


        return redirect()->route('coupons')->withErrors(['success' => 'Coupon deleted successfully']);
    }



    public function block($id)
    {
        $coupon = Coupon::find($id);
        if($coupon->status == 'blocked'){
            $coupon->status = 'active';
        }else{
        $coupon->status = 'blocked';
        }
        $coupon->save();


        return redirect()->route('coupons')->withErrors(['success' => 'Coupon status updated successfully']);
    }

}
