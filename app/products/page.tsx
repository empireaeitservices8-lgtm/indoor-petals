'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: initialCategory,
    minPrice: 0,
    maxPrice: 8000,
    lightReq: '',
    inStockOnly: false,
  });

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
    const q = searchParams.get('search');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 8000,
      lightReq: '',
      inStockOnly: false,
    });
    setSearchQuery('');
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (filters.category && filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Price match
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }

      // Light requirement match
      if (filters.lightReq) {
        if (!item.lightRequirement.toLowerCase().includes(filters.lightReq.toLowerCase())) {
          return false;
        }
      }

      // In stock match
      if (filters.inStockOnly && item.availability === 'Out of Stock') {
        return false;
      }

      // Search keyword match
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const fields = [
          item.name,
          item.productCode,
          item.description,
          item.categoryName,
          item.category,
          item.potType || '',
          item.lightRequirement || '',
          item.wateringRequirement || '',
          item.plantSize || '',
          item.availability || '',
          item.slug,
          ...(item.tags || []),
        ].map((f) => f.toLowerCase());

        if (!fields.some((f) => f.includes(q))) {
          return false;
        }
      }

      return true;
    });
  }, [filters, searchQuery]);

  const selectedCategoryObj = categories.find((c) => c.slug === filters.category);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#a8e07a]">
      {/* Header Banner */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 px-2.5 py-1 rounded bg-emerald-900 border border-emerald-700 font-bold">
              Product Catalog
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {selectedCategoryObj ? selectedCategoryObj.name : 'All Plants &amp; Gardening Products'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              {selectedCategoryObj
                ? selectedCategoryObj.description
                : 'Explore our complete botanical collection of fresh houseplants, outdoor shrubs, tabletop greens, designer ceramic pots, organic fertilizers, and LECA clay hydroton.'}
            </p>
          </div>

          {/* Quick Search Bar inside Catalog */}
          <div className="mt-6 max-w-xl relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, code (e.g. IP-IND-101), or keyword..."
              className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl text-stone-900 text-xs sm:text-sm outline-none shadow-md focus:ring-2 focus:ring-emerald-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid & Filter Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-bold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters &amp; Categories</span>
          </button>
          <span className="text-xs font-bold text-stone-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
          </span>
        </div>

        {/* Active Filter Chips */}
        {(filters.category !== 'all' || filters.lightReq || filters.inStockOnly || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-stone-200">
            <span className="text-xs font-bold text-stone-500">Active Filters:</span>
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                Category: {selectedCategoryObj?.name || filters.category}
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className="hover:text-rose-600 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.lightReq && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                Light: {filters.lightReq}
                <button
                  onClick={() => setFilters({ ...filters, lightReq: '' })}
                  className="hover:text-rose-600 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                In Stock Only
                <button
                  onClick={() => setFilters({ ...filters, inStockOnly: false })}
                  className="hover:text-rose-600 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900">
                Query: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery('')} className="hover:text-rose-600 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-600 font-bold hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-8 items-start">
          {/* Desktop & Mobile Category Filter Sidebar */}
          <CategoryFilter
            currentFilters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <ProductGrid
              products={filteredProducts}
              title={selectedCategoryObj?.name || 'All Botanical Offerings'}
              subtitle={`Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
              showControls={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
