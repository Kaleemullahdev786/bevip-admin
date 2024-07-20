<?php

namespace App\Http\Controllers;

use App\Models\Manufacturer;
use App\Http\Requests\StoreManufacturerRequest;
use App\Http\Requests\UpdateManufacturerRequest;
use Inertia\Inertia;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        $manufacturers = Manufacturer::get();
        return Inertia::render('Utils/Manufacturers/index', ['manufacturers' => $manufacturers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/Manufacturers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreManufacturerRequest $request)
    {

        $data = $request->validated();
        Manufacturer::create($data);
        return to_route('manufacturers')->withErrors('success','Manufacturer created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Manufacturer $manufacturer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Manufacturer $manufacturer)
    {
        return Inertia::render('Utils/Manufacturer/Edit', ['manufacturer' => $manufacturer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $manufacturer->update($data);
        return to_route('manufacturers')->withErrors('success','Manufacturer updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacturer)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        $manufacturer = Manufacturer::find($id);
        $manufacturer->delete();


        return redirect()->route('manufacturers')->withErrors(['success' => 'Manufacturer deleted successfully']);
    }



    public function block($id)
    {
        $manufacturer = Manufacturer::find($id);
        if($manufacturer->status == 'blocked'){
            $manufacturer->status = 'active';
        }else{
        $manufacturer->status = 'blocked';
        }
        $manufacturer->save();


        return redirect()->route('manufacturers')->withErrors(['success' => 'Manufacturer status updated successfully']);
    }

}
