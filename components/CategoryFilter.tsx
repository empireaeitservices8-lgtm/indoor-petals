'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { SlidersHorizontal, Check, RefreshCw, X } from 'lucide-react';

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  lightReq: string;
  inStockOnly: boolean;
}

interface CategoryFilterProps {
  currentFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const lightOptions = [
  'All Lighting Conditions',
  'Low Light',
  'Medium to Bright Indirect Sunlight',
  'Direct to bright indirect light',
  'Full Direct Sun',
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  currentFilters,
  onFilterChange,
  onReset,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const content = (
    <div className="flex flex-col gap-6">
      {/* Category List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
            All Categories ({categories.length})
          </h3>
          <button
            onClick={onReset}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
          <button
            onClick={() => onFilterChange({ ...currentFilters, category: 'all' })}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
              currentFilters.category === 'all' || !currentFilters.category
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <span>🌿 All Categories</span>
            {(currentFilters.category === 'all' || !currentFilters.category) && (
              <Check className="w-3.5 h-3.5" />
            )}
          </button>

          {categories.map((cat) => {
            const isSelected = currentFilters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ ...currentFilters, category: cat.slug })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-emerald-900 text-white font-bold shadow-sm'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </div>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 shrink-0 ml-1" />
                ) : (
                  <span className="text-[10px] text-stone-400 font-normal">{cat.itemCount}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-3">
          Price Range (₹{currentFilters.minPrice} - ₹{currentFilters.maxPrice})
        </h4>
        <input
          type="range"
          min="0"
          max="8000"
          step="200"
          value={currentFilters.maxPrice}
          onChange={(e) =>
            onFilterChange({ ...currentFilters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-emerald-800 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-500 font-medium mt-1">
          <span>₹0</span>
          <span>₹2,500</span>
          <span>₹5,000</span>
          <span>₹8,000+</span>
        </div>
      </div>

      {/* Light Requirement Filter */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-3">
          Light Requirement
        </h4>
        <div className="space-y-1.5">
          {lightOptions.map((opt) => {
            const isSelected =
              currentFilters.lightReq === opt || (!currentFilters.lightReq && opt.startsWith('All'));
            return (
              <label
                key={opt}
                className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-emerald-900"
              >
                <input
                  type="radio"
                  name="lightRequirement"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...currentFilters,
                      lightReq: opt.startsWith('All') ? '' : opt,
                    })
                  }
                  className="accent-emerald-800 w-3.5 h-3.5"
                />
                <span className={isSelected ? 'font-bold text-emerald-950' : 'font-normal'}>
                  {opt}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-stone-200">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-stone-800">In-Stock Only</span>
          <input
            type="checkbox"
            checked={currentFilters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...currentFilters, inStockOnly: e.target.checked })
            }
            className="toggle w-4 h-4 rounded accent-emerald-800 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs shrink-0 self-start sticky top-28">
        <div className="flex items-center gap-2 pb-3 mb-2 border-b border-stone-100">
          <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
          <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">Filter Catalog</h2>
        </div>
        {content}
      </div>

      {/* Mobile Slide-out Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-80 max-w-[90vw] h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-slide-up">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-extrabold text-stone-900 uppercase text-sm tracking-wider">Filter Products</h3>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-stone-200 mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 rounded-xl bg-emerald-900 text-white font-bold text-sm shadow-md hover:bg-emerald-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
