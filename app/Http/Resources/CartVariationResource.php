<?php

namespace App\Http\Resources;

use App\Models\Variation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

/** @mixin Variation */
class CartVariationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attribute_1' => $this->attribute_1,
            'attribute_2' => $this->attribute_2,
            'price' => Number::currency($this->price, 'IDR', 'id-ID', 0),
            'inStock' => $this->inStock(),
            'stock' => $this->stock,
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'href' => route('products.show', $this->product),
                'imageSrc' => $this->product->getPicture(),
                'imageAlt' => $this->product->name,
                'category' => $this->product->category ? [
                    'name' => $this->product->category->name,
                    'href' => route('categories.show', $this->product->category)
                ] : null
            ]
        ];
    }
}
