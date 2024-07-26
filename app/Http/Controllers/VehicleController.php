<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\BrandModel;
use App\Models\Category;
use App\Models\Color;
use App\Models\Feature;
use App\Models\Gallary;
use App\Models\Manufacturer;
use App\Models\Type;
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
        $vehicles = Vehicle::withTrashed()->latest()->get();
        $features = Feature::withTrashed()->get()->pluck(null,'id');


        return Inertia::render('Utils/Vehicles/index', ['vehicles' => $vehicles,'features'=>$features]);
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
        $manufacturers = Manufacturer::select('make as label', 'id as value')->get()->toArray();
        $types = Type::select('displayname as label', 'id as value')->get()->toArray();
        $brand_models = BrandModel::select('model as label', 'id as value')->get()->toArray();
        $catagories = Category::select('name as label', 'id as value')->get()->toArray();
        $colors = Color::select('color as label', 'id as value')->get()->toArray();
        $features = Feature::select('feature as label', 'id as value')->get()->toArray();

        return Inertia::render('Utils/Vehicles/Create',compact('manufacturers','types','brand_models','catagories','colors','features'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {


        $data = $request->validated();
        // dd($data);
        $image = $this->common->upload($data['banner'][0],'CarMedia');
        $data['vehicle_image'] = $image[1];
        $data['full_path'] = $image[0];

        if(isset($data['video_option'])){
            $image = $this->common->upload($data['video_option'][0],'CarMedia');
            $data['video'] = $image[0];

        }


        $gallary = $data['gallary'];
        $features = $this->common->extractValuesFromArray($data['features'],'value');
        unset($data['features']);
        unset($data['video_option']);
        unset($data['banner']);
        unset($data['gallary']);
        unset($data['image']);
        $data['all_features'] = implode(',',$features);
        // dd($data);
        $vehicle = Vehicle::create($data);
        $images = $this->common->uploadImages($gallary,$vehicle->id,'CarMedia','vehicle_id');
        // dd($images);
        Gallary::insert($images);
        // $data['banner'] = $image[0];

        // Vehicle::create($data);
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



        $vehicle->load('gallary');
        $manufacturers = Manufacturer::select('make as label', 'id as value')->get()->toArray();
        $types = Type::select('displayname as label', 'id as value')->get()->toArray();
        $brand_models = BrandModel::select('model as label', 'id as value')->get()->toArray();
        $catagories = Category::select('name as label', 'id as value')->get()->toArray();
        $colors = Color::select('color as label', 'id as value')->get()->toArray();
        $features = Feature::select('feature as label', 'id as value')->get()->toArray();
        return Inertia::render('Utils/Vehicles/Edit', compact('vehicle','manufacturers','types','brand_models','catagories','colors','features'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        // dd($request->all());

        $data = $request->validated();
        if(isset($data['image']))
        {
        $image = $this->common->upload($data['banner'][0],'CarMedia');
        $data['vehicle_image'] = $image[1];
        $data['full_path'] = $image[0];

        }
        if(isset($data['video_option']))
        {
        $image = $this->common->upload($data['video_option'][0],'CarMedia');
        $data['video'] = $image[0];
        }

        if(isset($data['video_option'])){
            $gallary = $data['gallary'];
            $images = $this->common->uploadImages($gallary,$vehicle->id,'CarMedia','vehicle_id');
             Gallary::insert($images);
        }

        $features = $this->common->extractValuesFromArray($data['features'],'value');
        unset($data['features']);
        unset($data['video_option']);
        unset($data['banner']);
        unset($data['gallary']);
        unset($data['image']);
        if(is_array($features))
        $data['all_features'] = implode(',',$features);
        else
       $data['all_features'] = implode(',',$features);

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


    public function delete(Vehicle $vehicle)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete vehicles');
        if(!$hasPermission){
            abort(403);
        }

        $vehicle->gallary()->delete();
        $this->common->deleteImageFromDir($vehicle->image,'CarMedia');
        $vehicle->delete();


        return redirect()->route('vehicles')->withErrors(['success' => 'Vehicle deleted successfully']);
    }



    public function block(Vehicle $vehicle)
    {

        if($vehicle->status == 'inactive'){
            $vehicle->status = 'active';
        }else{
        $vehicle->status = 'inactive';
        }


        $vehicle->save();


        return redirect()->route('vehicles')->withErrors(['success' => 'Vehicle status updated successfully']);
    }

    public function restored($id)
    {


        $vehicle = Vehicle::withTrashed()->find($id);
        // dd($id,$vehicle);
        $vehicle->restore();


        return redirect()->route('vehicles')->withErrors(['success' => 'Vehicle restored successfully']);
    }

}
