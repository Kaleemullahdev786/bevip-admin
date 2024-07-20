<?php

namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use App\Http\Requests\StoreGeneralSettingRequest;
use App\Http\Requests\UpdateGeneralSettingRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class GeneralSettingController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view general_settings');
        if(!$hasPermission){
            abort(403);
        }
        $general_settings = GeneralSetting::get();
        return Inertia::render('Utils/GeneralSettings/index', ['general_settings' => $general_settings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create general_settings');
        if(!$hasPermission){
            abort(403);
        }

        return Inertia::render('Utils/GeneralSettings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGeneralSettingRequest $request)
    {

        $data = $request->validated();
        // $image = $this->common->upload($data['image'][0],'packages');
        // $data['image_name'] = $image[1];
        // $data['image'] = $image[0];

        GeneralSetting::create($data);
        return to_route('general_settings')->withErrors('success','General Settings created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(GeneralSetting $general_setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneralSetting $general_setting)
    {

        return Inertia::render('Utils/GeneralSettings/Edit', ['general_setting' => $general_setting]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGeneralSettingRequest $request, GeneralSetting $general_setting)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update general_settings');
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
        $general_setting->update($data);
        return to_route('packages')->withErrors('success','General Setting updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralSetting $general_setting)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete general_settings');
        if(!$hasPermission){
            abort(403);
        }
        $general_setting = GeneralSetting::find($id);
        // $this->common->deleteImageFromDir($package->image,'general_settings');
        $general_setting->delete();


        return redirect()->route('general_settings')->withErrors(['success' => 'General Setting deleted successfully']);
    }



    public function block($id)
    {
        $general_setting = GeneralSetting::find($id);
        if($general_setting->status == 'blocked'){
            $general_setting->status = 'active';
        }else{
        $general_setting->status = 'blocked';
        }
        $general_setting->save();


        return redirect()->route('general_settings')->withErrors(['success' => 'General Setting status updated successfully']);
    }

}
