'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { LayoutGrid, List, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showControls?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  showControls = false,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="w-full">
      {/* Optional Section Header / Controls */}
      {(title || showControls) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200/80">
          <div>
            {title && <h2 className="text-xl md:text-2xl font-black text-emerald-950">{title}</h2>}
            {subtitle && <p className="text-xs md:text-sm text-stone-500 mt-0.5">{subtitle}</p>}
          </div>

          {showControls && (
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-800" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer text-xs font-medium text-stone-800"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="name">Alphabetical (A - Z)</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid or List Display */}
      {sortedProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5'
              : 'flex flex-col gap-4'
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl mb-3">
            🪴
          </div>
          <h3 className="text-lg font-bold text-stone-900">No products found</h3>
          <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, price sliders, or category filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
