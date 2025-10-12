<?php

namespace App\Http\Resources;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

/** @mixin Cart */
class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'variation_id' => $this->variation_id,
            'quantity' => $qty = $this->quantity,
            'price' => Number::currency($this->price * $qty, 'IDR', 'id-ID', 0),
            'variation' => new CartVariationResource($this->variation->load('product.category')),
        ];
    }
}
