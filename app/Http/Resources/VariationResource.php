<?php

namespace App\Http\Resources;

use App\Models\Variation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

/** @mixin Variation */
class VariationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attribute_1' => $this->attribute_1,
            'attribute_2' => $this->attribute_2,
            'stock' => $this->stock,
            'price' => Number::currency($this->price, 'IDR', 'id-ID', 0),
            'inStock' => $this->stock > 0,
        ];
    }
}
