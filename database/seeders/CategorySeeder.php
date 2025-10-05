<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            'Foods', 'Drinks', 'Snacks', 'Clothes', 'Accessories', 'Shoes', 'Bags', 'Electronics', 'Books', 'Toys'
        ])->each(fn($category) => \App\Models\Category::query()->create([
            'name' => $category,
            'slug' => \Str::slug($category),
        ]));
    }
}
