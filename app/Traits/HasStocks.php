<?php

namespace App\Traits;

use App\Models\Variation;

/**
 * Trait HasStocks
 *
 * Provides stock management functionalities for models that have a 'stock' attribute.
 */
trait HasStocks
{
    public function inStock(): bool
    {
        return $this->stock > 0;
    }

    public function outOfStock(): bool
    {
        return !$this->inStock();
    }

    public function lowStock(int $threshold = 5): bool
    {
        return $this->stock <= $threshold;
    }

    public function hasStock(): bool
    {
        return $this->stock > 0;
    }
}
