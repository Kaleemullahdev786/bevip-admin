<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class TypeController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view types');
        if(!$hasPermission){
            abort(403);
        }
        $types = Type::withTrashed()->latest()->get();
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
        $image = $this->common->upload($data['icon'][0],'CarType');
        $data['icon'] = $image[1];
        $data['full_path'] = $image[0];
        Type::create($data);
        return to_route('types')->withErrors(['success'=>'Type created successfully']);



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

        $data = $request->validated();
        if(isset($data['icon'])){
            $image = $this->common->upload($data['icon'][0],'CarType');
                $data['icon'] = $image[1];
                $data['full_path'] = $image[0];
                $this->common->deleteImageFromDir($type->image,'CarType');
            }

        $type->update($data);
        return to_route('types')->withErrors(['success'=>'Type updated successfully']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        //
    }


    public function delete(Type $type)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete types');
        if(!$hasPermission){
            abort(403);
        }
        $type->delete();


        return redirect()->route('types')->withErrors(['success' => 'Type deleted successfully']);
    }



    public function block(Type $type)
    {
        if($type->status == 'inactive'){
            $type->status = 'active';
        }else{
        $type->status = 'inactive';
        }
        $type->save();

        return redirect()->route('types')->withErrors(['success' => 'Type status updated successfully']);
    }
    public function restored($id)
    {

        $record = Type::withTrashed()->find($id);
        $record->restore();


        return redirect()->route('types')->withErrors(['success' => 'Type restored successfully']);
    }
}
