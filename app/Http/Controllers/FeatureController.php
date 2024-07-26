<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Http\Requests\StoreFeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class FeatureController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view features');
        if(!$hasPermission){
            abort(403);
        }
        $features = Feature::withTrashed()->latest()->paginate(10);
        // dd($features);
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

        return Inertia::render('Utils/Features/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeatureRequest $request)
    {


        $data = $request->validated();

        $image = $this->common->upload($data['icon'][0],'FeatureIcons');
        $data['image'] = $image[1];
        $data['full_path'] = $image[0];
        // dd($image);

        Feature::create($data);
        return to_route('features')->withErrors(['success'=>'Feature created successfully']);



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

        $data = $request->validated();
        // dd($data);
        if(isset($data['icon'])){
            $image = $this->common->upload($data['icon'][0],'FeatureIcons');
                $data['image'] = $image[1];
                $data['full_path'] = $image[0];
                $this->common->deleteImageFromDir($feature->full_path,'FeatureIcons');
            }


            $data['feature'] = $data['feature_name'];
            unset($data['feature_name']);


        $feature->update($data);
        return to_route('features')->withErrors(['success'=>'Feature updated successfully']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        //
    }


    public function delete(Feature $feature)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete features');
        if(!$hasPermission){
            abort(403);
        }
        $this->common->deleteImageFromDir($feature->image,'features');
        $feature->delete();


        return redirect()->route('features')->withErrors(['success' => 'Feature deleted successfully']);
    }



    public function block(Feature $feature)
    {
        if($feature->status == 'inactive'){
            $feature->status = 'active';
        }else{
        $feature->status = 'inactive';
        }
        $feature->save();


        return redirect()->route('features')->withErrors(['success' => 'Feature status updated successfully']);
    }

    public function restored($id)
    {

        $record = Feature::withTrashed()->find($id);
        $record->restore();


        return redirect()->route('features')->withErrors(['success' => 'Feature restored successfully']);
    }



}
