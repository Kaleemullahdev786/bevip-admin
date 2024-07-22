<?php

namespace App\Http\Controllers;

use App\Models\CarComparison;
use App\Http\Requests\StoreCarComparisonRequest;
use App\Http\Requests\UpdateCarComparisonRequest;
use Inertia\Inertia;

class CarComparisonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hasPermission = auth()->user()->hasPermissionTo('view car_comparisons');
        if(!$hasPermission){
            abort(403);
        }
        $car_comparisons = CarComparison::get();
        return Inertia::render('Utils/CarComparisons/index', ['car_comparisons' => $car_comparisons]);
    }

   /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create car_comparisons');
        if(!$hasPermission){
            abort(403);
        }
        $car_comparisons = CarComparison::select('name as label', 'name as value')->get()->toArray();
        return Inertia::render('Utils/CarComparisons/Create', ['car_comparisons' => $car_comparisons]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarComparisonRequest $request)
    {

        $data = $request->validated();
        CarComparison::create($data);
        return to_route('car_comparisons')->withErrors('success','Saved Car Comparison successfully');

    }




    /**
     * Display the specified resource.
     */
    public function show(CarComparison $car_comparison)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarComparison $car_comparison)
    {

        return Inertia::render('Utils/CarComparisons/Edit', ['car_comparison' => $car_comparison]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarComparisonRequest $request, CarComparison $car_comparison)
    {
        $hasPermission = auth()->user()->hasPermissionTo('update car_comparisons');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
        $car_comparison->update($data);
        return to_route('car_comparisons')->withErrors('success','Car comparisons updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarComparison $car_comparison)
    {
        //
    }


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete car_comparisons');
        if(!$hasPermission){
            abort(403);
        }
        $car_comparison = CarComparison::find($id);
        $car_comparison->delete();


        return redirect()->route('car_comparisons')->withErrors(['success' => 'Car Comparison  deleted successfully']);
    }



    public function block($id)
    {
        $car_comparison = CarComparison::find($id);
        if($car_comparison->status == 'inactive'){
            $car_comparison->status = 'active';
        }else{
        $car_comparison->status = 'inactive';
        }
        $car_comparison->save();


        return redirect()->route('car_comparisons')->withErrors(['success' => 'Car Comparison status updated successfully']);
    }

}
