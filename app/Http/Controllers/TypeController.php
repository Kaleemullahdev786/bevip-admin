<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use Inertia\Inertia;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view types');
        if(!$hasPermission){
            abort(403);
        }
        $types = Type::get();
        return Inertia::render('Utils/Types/index', ['types' => $types]);
    }
 /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create types');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/Types/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypeRequest $request)
    {

        $data = $request->validated();
        Type::create($data);
        return to_route('packages')->withErrors('success','Type created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Type $type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Type $type)
    {
        return Inertia::render('Utils/Types/Edit', ['type' => $type]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTypeRequest $request, Type $type)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update types');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $type->update($data);
        return to_route('types')->withErrors('success','Type updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete types');
        if(!$hasPermission){
            abort(403);
        }
        $type = Type::find($id);
        $type->delete();


        return redirect()->route('types')->withErrors(['success' => 'Type deleted successfully']);
    }



    public function block($id)
    {
        $package = Type::find($id);
        if($package->status == 'blocked'){
            $package->status = 'active';
        }else{
        $package->status = 'blocked';
        }
        $package->save();

        return redirect()->route('packages')->withErrors(['success' => 'Type status updated successfully']);
    }

}
