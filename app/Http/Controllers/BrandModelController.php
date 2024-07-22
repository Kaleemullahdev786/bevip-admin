<?php

namespace App\Http\Controllers;

use App\Models\BrandModel;
use App\Http\Requests\StoreBrandModelRequest;
use App\Http\Requests\UpdateBrandModelRequest;
use App\Models\Manufacturer;
use Inertia\Inertia;

class BrandModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view brand_models');
        if(!$hasPermission){
            abort(403);
        }
        $brand_models = BrandModel::with('manufacturer')->get();
        // dd($brand_models);
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
        $manufactuers = Manufacturer::select('name as label', 'id as value')->get()->toArray();
        return Inertia::render('Utils/BrandModels/Create', ['manufactuers' => $manufactuers]);
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
        $brand_model->load('manufacturer');
        $manufactuers = Manufacturer::select('name as label', 'id as value')->get()->toArray();
        return Inertia::render('Utils/BrandModels/Edit', ['brand_model' => $brand_model,'manufactuers'=>$manufactuers]);
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
        return to_route('brand_models')->withErrors(['success'=>'Model updated successfully']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BrandModel $brand_model)
    {
        //
    }


    public function delete(BrandModel $brand_model)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete brand_models');
        if(!$hasPermission){
            abort(403);
        }

        $brand_model->delete();


        return redirect()->route('brand_models')->withErrors(['success' => 'Model deleted successfully']);
    }



    public function block(BrandModel $brand_model)
    {

        if($brand_model->status == 'inactive'){
            $brand_model->status = 'active';
        }else{
        $brand_model->status = 'inactive';
        }
        $brand_model->save();


        return redirect()->route('brand_models')->withErrors(['success' => 'Model status updated successfully']);
    }

    public function restored($id)
    {

        $record = BrandModel::withTrashed()->find($id);
        $record->restored();


        return redirect()->route('brand_models')->withErrors(['success' => 'Model restored successfully']);
    }
}
