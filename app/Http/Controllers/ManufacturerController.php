<?php

namespace App\Http\Controllers;

use App\Models\Manufacturer;
use App\Http\Requests\StoreManufacturerRequest;
use App\Http\Requests\UpdateManufacturerRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class ManufacturerController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        $manufacturers = Manufacturer::withTrashed()->latest()->get();
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
        $image = $this->common->upload($data['picture'][0],'CarManufacturers');
        $data['image'] = $image[1];
        $data['full_path'] = $image[0];

        Manufacturer::create($data);
        return to_route('manufacturers')->withErrors(['success'=>'Manufacturer created successfully']);



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
        return Inertia::render('Utils/Manufacturers/Edit', ['manufacturer' => $manufacturer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer)
    {
        $data = $request->validated();
        if(isset($data['picture'])){
            $image = $this->common->upload($data['picture'][0],'CarManufacturers');
                $data['image'] = $image[1];
                $data['full_path'] = $image[0];
                $this->common->deleteImageFromDir($manufacturer->full_path,'CarManufacturers');
            }
        $manufacturer->update($data);
        return to_route('manufacturers')->withErrors(['success'=>'Manufacturer updated successfully']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacturer)
    {
        //
    }


    public function delete(Manufacturer $manufacturer)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete manufacturers');
        if(!$hasPermission){
            abort(403);
        }
        $this->common->deleteImageFromDir($manufacturer->image,'manufacturers');
        $manufacturer->delete();

        $manufacturer->delete();


        return redirect()->route('manufacturers')->withErrors(['success' => 'Manufacturer deleted successfully']);
    }



    public function block(Manufacturer $manufacturer)
    {

        if($manufacturer->status == 'inactive'){
            $manufacturer->status = 'active';
        }else{
        $manufacturer->status = 'inactive';
        }
        $manufacturer->save();


        return redirect()->route('manufacturers')->withErrors(['success' => 'Manufacturer status updated successfully']);
    }

    public function restored($id)
    {

        $record = Manufacturer::withTrashed()->find($id);
        $record->restore();


        return redirect()->route('manufacturers')->withErrors(['success' => 'Manufacture restored successfully']);
    }

}
