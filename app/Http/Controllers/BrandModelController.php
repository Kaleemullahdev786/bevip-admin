<?php

namespace App\Http\Controllers;

use App\Models\BrandModel;
use App\Http\Requests\StoreBrandModelRequest;
use App\Http\Requests\UpdateBrandModelRequest;
use Inertia\Inertia;

class BrandModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view brandmodels');
        if(!$hasPermission){
            abort(403);
        }
        $brand_models = BrandModel::where('status', 'active')->get();
        return Inertia::render('Utils/BrandModels/index', ['brand_models' => $brand_models]);
    }

   /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create brand_models');
        if(!$hasPermission){
            abort(403);
        }
        $perks = BrandModel::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/Packages/Create', ['perks' => $perks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandModelRequest $request)
    {

        $data = $request->validated();
        BrandModel::create($data);

        return to_route('brand_models')->withErrors('success','Model created successfully');

    }




    /**
     * Display the specified resource.
     */
    public function show(BrandModel $brand_model)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BrandModel $brand_model)
    {

        return Inertia::render('Utils/BrandModels/Edit', ['brand_model' => $brand_model]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandModelRequest $request, BrandModel $brand_model)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update brand_models');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $brand_model->update($data);
        return to_route('brand_models')->withErrors('success','Model updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BrandModel $brand_model)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete brand_models');
        if(!$hasPermission){
            abort(403);
        }
        $package = BrandModel::find($id);
        $package->delete();


        return redirect()->route('brand_models')->withErrors(['success' => 'Model deleted successfully']);
    }



    public function block($id)
    {
        $brand_model = BrandModel::find($id);
        if($brand_model->status == 'blocked'){
            $brand_model->status = 'active';
        }else{
        $brand_model->status = 'blocked';
        }
        $brand_model->save();


        return redirect()->route('brand_models')->withErrors(['success' => 'Model status updated successfully']);
    }

}
