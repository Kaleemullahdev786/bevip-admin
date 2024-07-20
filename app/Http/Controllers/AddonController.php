<?php

namespace App\Http\Controllers;

use App\Models\Addon;
use App\Http\Requests\StoreAddonRequest;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateAddonRequest;
use App\Http\Requests\UpdateColorRequest;
use App\Models\Color;
use App\Services\CommonClass;
use Inertia\Inertia;

class AddonController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view addons');
        if(!$hasPermission){
            abort(403);
        }
        $addons = Addon::where('status', 'active')->get();
        return Inertia::render('Utils/Addons/index', ['addons' => $addons]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create addons');
        if(!$hasPermission){
            abort(403);
        }
        $addons = Addon::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/Addons/Create', ['addons' => $addons]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColorRequest $request)
    {

        $data = $request->validated();

        Addon::create($data);
        return to_route('addons')->withErrors('success','Addon created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Addon $addon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Addon $addon)
    {
        $addons = Addon::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/Addons/Edit', ['addon' => $addon,'addons'=>$addons]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddonRequest $request, Addon $addon)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update addons');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();

        $addon->update($data);
        return to_route('addons')->withErrors('success','addon updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete addons');
        if(!$hasPermission){
            abort(403);
        }
        $addon = Addon::find($id);

        $addon->delete();


        return redirect()->route('addons')->withErrors(['success' => 'addon deleted successfully']);
    }



    public function block($id)
    {
        $color = Addon::find($id);
        if($color->status == 'blocked'){
            $color->status = 'active';
        }else{
        $color->status = 'blocked';
        }
        $color->save();


        return redirect()->route('addons')->withErrors(['success' => 'addon status updated successfully']);
    }

}
