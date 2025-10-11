<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $products = Product::query()
            ->whereBelongsTo($category)
            ->latest()
            ->paginate(12);

        return inertia('products/index', [
            'title' => "Category $category->name",
            'products' => ProductListResource::collection($products)->additional([
                'meta' => ['has_pages' => $products->hasPages()],
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
