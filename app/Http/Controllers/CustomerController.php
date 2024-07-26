<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view customers');
        if(!$hasPermission){
            abort(403);
        }
        $customers = Customer::get();
        return Inertia::render('Utils/Customers/index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create customers');
        if(!$hasPermission){
            abort(403);
        }

        return Inertia::render('Utils/Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {

        $data = $request->validated();
        // $image = $this->common->upload($data['image'][0],'packages');
        // $data['image_name'] = $image[1];
        // $data['image'] = $image[0];

        Customer::create($data);
        return to_route('packages')->withErrors('success','Customer created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {

        return Inertia::render('Utils/Customers/Edit', ['customer' => $customer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update customers');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        // if(isset($data['image'])){
        // $image = $this->common->upload($data['image'][0],'packages');
        //     $data['image_name'] = $image[1];
        //     $data['image'] = $image[0];
        //     $this->common->deleteImageFromDir($package->image,'packages');
        // }
        // dd($package);
        $customer->update($data);
        return to_route('customers')->withErrors('success','Customer updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete customers');
        if(!$hasPermission){
            abort(403);
        }
        $customer = Customer::find($id);
        // $this->common->deleteImageFromDir($customer->image,'customers');
        $customer->delete();


        return redirect()->route('customers')->withErrors(['success' => 'Customer deleted successfully']);
    }



    public function block($id)
    {
        $customer = Customer::find($id);
        if($customer->status == 'inactive'){
            $customer->status = 'active';
        }else{
        $customer->status = 'inactive';
        }
        $customer->save();


        return redirect()->route('customers')->withErrors(['success' => 'Customer status updated successfully']);
    }

    public function restored($id)
    {

        $record = Customer::withTrashed()->find($id);
        $record->restore();


        return redirect()->route('customers')->withErrors(['success' => 'customer restored successfully']);
    }

}
