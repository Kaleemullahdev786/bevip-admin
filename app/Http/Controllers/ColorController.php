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

        $colors = Color::all();
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
        Color::create($request->validated());
        return to_route('colors')->withErrors(['success'=>'Color created successfully']);
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
        $color->update($request->validated());
        return to_route('colors')->withErrors(['success'=>'Color updated successfully']);

    }

    /**
     * Remove the specified resource from database.
     */
    public function delete(Color $color)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete colors');
        if(!$hasPermission){
            abort(403);
        }
        $color->delete();
        return redirect()->route('colors')->withErrors(['success' => 'Color deleted successfully']);
    }

    /**
     * Change Status the specified resource.
     * @param $color id
     */

    public function block(Color $color)
    {

        if($color->status == 'inactive'){
            $color->status = 'active';
        }else{
        $color->status = 'inactive';
        }
        $color->save();

        return redirect()->route('colors')->withErrors(['success' => 'Color status updated successfully']);
    }

    public function restored($id)
    {

        $record = Color::withTrashed()->find($id);
        $record->restored();


        return redirect()->route('colors')->withErrors(['success' => 'Color restored successfully']);
    }

}
