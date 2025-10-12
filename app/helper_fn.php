<?php

if (!function_exists('flashMessage')) {
    function flashMessage($title, $message, $type = 'success'): void
    {
        session()->flash('title', $title);
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (!function_exists('taxCalculation')) {
    function taxCalculation($price, $taxRate = 12): float
    {
        return $price * ($taxRate / 100);
    }
}
