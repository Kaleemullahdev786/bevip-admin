<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
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
        $hasPermission = auth()->user()->hasPermissionTo('update categories');
        if(!$hasPermission){
            abort(403);
        }
        $data = $request->validated();
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


    public function delete($id)
    {
        $hasPermission = auth()->user()->hasPermissionTo('delete categories');
        if(!$hasPermission){
            abort(403);
        }
        $category = Category::find($id);
        $category->delete();


        return redirect()->route('categories')->withErrors(['success' => 'Category deleted successfully']);
    }



    public function block($id)
    {
        $category = Category::find($id);
        if($category->status == 'blocked'){
            $category->status = 'active';
        }else{
        $category->status = 'blocked';
        }
        $category->save();


        return redirect()->route('categories')->withErrors(['success' => 'Category status updated successfully']);
    }

}
