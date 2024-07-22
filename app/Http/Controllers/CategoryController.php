<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CommonClass;
use Inertia\Inertia;

class CategoryController extends Controller
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
        $hasPermission = auth()->user()->hasPermissionTo('view categories');
        if(!$hasPermission){
            abort(403);
        }
        $categories = Category::get();
        return Inertia::render('Utils/Categories/index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hasPermission = auth()->user()->hasPermissionTo('create categories');
        if(!$hasPermission){
            abort(403);
        }
        return Inertia::render('Utils/Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {

        $data = $request->validated();
        $image = $this->common->upload($data['icon'][0],'categories');
        $data['image'] = $image[0];

        Category::create($data);
        return to_route('categories')->withErrors('success','Category created successfully');



    }




    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {

        return Inertia::render('Utils/Categories/Edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        if(isset($data['icon'])){
            $image = $this->common->upload($data['icon'][0],'features');
                $data['image'] = $image[0];
                $this->common->deleteImageFromDir($feature->image,'features');
            }
        $category->update($data);
        return to_route('categories')->withErrors('success','Category updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }


    public function delete(Category $category)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete categories');
        if(!$hasPermission){
            abort(403);
        }
        $this->common->deleteImageFromDir($category->image,'categories');
        $category->delete();
        return redirect()->route('categories')->withErrors(['success' => 'Category deleted successfully']);
    }



    public function block(Category $category)
    {

        if($category->status == 'inactive'){
            $category->status = 'active';
        }else{
        $category->status = 'inactive';
        }
        $category->save();


        return redirect()->route('categories')->withErrors(['success' => 'Category status updated successfully']);
    }

    public function restored($id)
    {

        $record = Category::withTrashed()->find($id);
        $record->restored();


        return redirect()->route('categories')->withErrors(['success' => 'Category restored successfully']);
    }
}
