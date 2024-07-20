<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class VehicleController extends Controller
{

    public $common;


    public function __construct(CommonClass $common)
    {
        $this->common = $common;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view vehicles');
        if(!$hasPermission){
            abort(403);
        }
        $vehicles = Vehicle::get();
        return Inertia::render('Utils/PaymentSettings/index', ['vehicles' => $vehicles]);
    }
 /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create vehicles');
        if(!$hasPermission){
            abort(403);
        }
        $vehicles = Vehicle::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/Vehicles/Create', ['vehicles' => $vehicles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {

        $data = $request->validated();
        // $image = $this->common->upload($data['image'][0],'packages');
        // $data['image_name'] = $image[1];
        // $data['image'] = $image[0];

        Vehicle::create($data);
        return to_route('vehicles')->withErrors('success','Vehicles created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        $vehicles = Vehicle::select('name as label', 'name as value')->get()->toArray();
        $status = $this->common->convertIntoArray([$vehicle->status]);
        return Inertia::render('Utils/Vehicles/Edit', ['vehicle' => $vehicle,'vehicles'=>$vehicles,'status'=>$status]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update vehicles');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        if(isset($data['image'])){
        $image = $this->common->upload($data['image'][0],'vehicles');
            $data['image_name'] = $image[1];
            $data['image'] = $image[0];
            $this->common->deleteImageFromDir($vehicle->image,'vehicles');
        }
        // dd($package);
        $vehicle->update($data);
        return to_route('vehicles')->withErrors('success','Vehicle updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete vehicle');
        if(!$hasPermission){
            abort(403);
        }
        $vehicle = Vehicle::find($id);
        $this->common->deleteImageFromDir($vehicle->image,'vehicle');
        $vehicle->delete();


        return redirect()->route('vehicles')->withErrors(['success' => 'Vehicle deleted successfully']);
    }



    public function block($id)
    {
        $vehicle = Vehicle::find($id);
        if($vehicle->status == 'blocked'){
            $vehicle->status = 'active';
        }else{
        $vehicle->status = 'blocked';
        }
        $vehicle->save();


        return redirect()->route('vehicles')->withErrors(['success' => 'Vehicle status updated successfully']);
    }

}
