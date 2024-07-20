<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use Inertia\Inertia;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view colors');
        if(!$hasPermission){
            abort(403);
        }
        $colors = Color::get();
        return Inertia::render('Utils/Colors/index', ['colors' => $colors]);
    }
 /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create colors');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/Colors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColorRequest $request)
    {

        $data = $request->validated();
        Color::create($data);
        return to_route('colors')->withErrors('success','Color created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Color $color)
    {
        return Inertia::render('Utils/Colors/Edit', ['color' => $color]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update colors');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $color->update($data);
        return to_route('colors')->withErrors('success','Color updated successfully');

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
        $hasPermission = auth()->user()->hasPermissionTo('delete colors');
        if(!$hasPermission){
            abort(403);
        }
        $color = Color::find($id);

        $color->delete();


        return redirect()->route('colors')->withErrors(['success' => 'Color deleted successfully']);
    }



    public function block($id)
    {
        $color = Color::find($id);
        if($color->status == 'blocked'){
            $color->status = 'active';
        }else{
        $color->status = 'blocked';
        }
        $color->save();


        return redirect()->route('colors')->withErrors(['success' => 'Color status updated successfully']);
    }

}
