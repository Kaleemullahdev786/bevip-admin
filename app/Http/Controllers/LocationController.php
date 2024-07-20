<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view locations');
        if(!$hasPermission){
            abort(403);
        }
        $locations = Location::get();
        return Inertia::render('Utils/Locations/index', ['locations' => $locations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create locations');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/Locations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {

        $data = $request->validated();
        Location::create($data);
        return to_route('locations')->withErrors('success','Location created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        return Inertia::render('Utils/Locations/Edit', ['location' => $location]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update locations');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $location->update($data);
        return to_route('locations')->withErrors('success','Location updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete locations');
        if(!$hasPermission){
            abort(403);
        }
        $location = Location::find($id);
        $location->delete();


        return redirect()->route('locations')->withErrors(['success' => 'Location deleted successfully']);
    }



    public function block($id)
    {
        $location = Location::find($id);
        if($location->status == 'blocked'){
            $location->status = 'active';
        }else{
        $location->status = 'blocked';
        }
        $location->save();


        return redirect()->route('locations')->withErrors(['success' => 'Location status updated successfully']);
    }

}
