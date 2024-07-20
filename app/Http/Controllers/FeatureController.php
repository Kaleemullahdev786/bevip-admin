<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Http\Requests\StoreFeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view features');
        if(!$hasPermission){
            abort(403);
        }
        $features = Feature::get();
        return Inertia::render('Utils/Features/index', ['features' => $features]);
    }

   /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create features');
        if(!$hasPermission){
            abort(403);
        }
        $perks = Perk::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/Features/Create', ['perks' => $perks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeatureRequest $request)
    {

        $data = $request->validated();
        Feature::create($data);
        return to_route('features')->withErrors('success','Feature created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {

        return Inertia::render('Utils/Features/Edit', ['feature' => $feature]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeatureRequest $request, Feature $feature)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update features');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();

        $feature->update($data);
        return to_route('features')->withErrors('success','Feature updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete features');
        if(!$hasPermission){
            abort(403);
        }
        $package = Feature::find($id);
        $package->delete();


        return redirect()->route('features')->withErrors(['success' => 'Feature deleted successfully']);
    }



    public function block($id)
    {
        $features = Feature::find($id);
        if($features->status == 'blocked'){
            $features->status = 'active';
        }else{
        $features->status = 'blocked';
        }
        $features->save();


        return redirect()->route('features')->withErrors(['success' => 'Feature status updated successfully']);
    }

}
