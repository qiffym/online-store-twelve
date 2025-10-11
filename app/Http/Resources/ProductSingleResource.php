<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

/** @mixin Product */
class ProductSingleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'href' => route('products.show', $this),
            'imageSrc' => $this->getPicture(),
            'imageAlt' => $this->name,
            'description' => $this->description,
            'price' => Number::currency($this->price, 'IDR', 'id-ID', 0),
            'category' => $this->category ? [
                'name' => $this->category->name,
                'href' => route('categories.show', $this->category)
            ] : null,

            'variations' => $this->variations
                ->groupBy('attribute_1')
                ->map(fn($item, $key) => VariationResource::collection($item))->toArray(),
        ];
    }
}
