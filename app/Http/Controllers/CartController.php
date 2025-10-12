<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Variation;
use Illuminate\Http\Request;
use Illuminate\Support\Number;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Cart::query()
            ->whereBelongsTo(auth()->user())
            ->whereNull('placed_at')
            ->with('variation.product')
            ->latest()
            ->get();

        $orderSummary = [
            'subTotal' => Number::format($subtotal = $carts->sum(fn($cart) => $cart->price * $cart->quantity)),
            'tax' => Number::format($tax = taxCalculation($subtotal)),
            'total' => Number::currency($subtotal + $tax, 'IDR', 'id-ID', 0),
        ];

        return inertia('cart/index', [
            'carts' => CartResource::collection($carts),
            'orderSummary' => $orderSummary
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $variation = Variation::findOrFail($request->variation_id);
        $existsQty = $request->user()->carts()->whereBelongsTo($variation)->value('quantity');

        $request->user()->carts()->whereNull('placed_at')->updateOrCreate(
            ['variation_id' => $variation->id],
            [
                'variation_id' => $variation->id,
                'quantity' => $request->quantity + ($existsQty ?? 0),
                'price' => $variation->price,
            ]
        );

        return to_route('carts.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $cart->update($request->only('quantity'));

        return to_route('carts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return back();
    }
}
