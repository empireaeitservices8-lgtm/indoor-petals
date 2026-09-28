'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Product } from '@/types';
import { formatINR } from '@/lib/utils';

interface SearchBarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen = false, onClose, isInline = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const scored = products
      .map((p) => {
        const fields = [
          p.name,
          p.productCode,
          p.categoryName,
          p.category,
          p.description,
          p.potType || '',
          p.lightRequirement || '',
          p.wateringRequirement || '',
          p.plantSize || '',
          p.availability || '',
          p.slug,
          ...(p.tags || []),
        ].map((f) => f.toLowerCase());

        // Score: name-starts-with gets highest priority
        let score = 0;
        if (p.name.toLowerCase().startsWith(q)) score += 10;
        else if (p.name.toLowerCase().includes(q)) score += 6;
        if (p.productCode.toLowerCase().includes(q)) score += 5;
        if ((p.tags || []).some((t) => t.toLowerCase().includes(q))) score += 4;
        if (p.categoryName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) score += 3;
        if (fields.some((f) => f.includes(q))) score += 1;

        return { product: p, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.product);

    setResults(scored.slice(0, 8));
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchContent = (
    <div className="w-full flex flex-col">
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full">
        <Search className="absolute left-4 w-5 h-5 text-emerald-700/60 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search indoor plants, pots, fertilizers, codes (e.g. Monstera, IP-IND-101)..."
          className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-emerald-900/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-stone-900 placeholder-stone-400 text-sm md:text-base outline-none transition-all shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Search Chips */}
      {!query && (
        <div className="mt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {['Monstera', 'Snake Plant', 'Succulents', 'Outdoor Plants', 'Ceramic Pots', 'Self-Watering', 'Desk Plants', 'Fertilizer', 'Plant Gifts'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium transition-colors border border-emerald-200/50"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Explore Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  onClick={onClose}
                  className="text-xs p-2 rounded-xl bg-stone-50 hover:bg-emerald-50/80 text-stone-700 hover:text-emerald-900 flex items-center gap-2 border border-stone-100 transition-colors"
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Search Results */}
      {query && (
        <div className="mt-4 divide-y divide-stone-100 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Products ({results.length})
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group border border-transparent hover:border-emerald-100"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.categoryName)}&background=d1fae5&color=047857&size=80&bold=true`;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {product.productCode}
                        </span>
                        <span className="text-xs text-emerald-700 font-medium truncate">{product.categoryName}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-emerald-800">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-emerald-900">{formatINR(product.price)}</span>
                        <span className="text-xs text-stone-400 line-through">{formatINR(product.mrp)}</span>
                        <span className="text-[10px] text-emerald-600 font-medium">
                          {product.availability}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-3 text-center border-t border-stone-100">
                <Link
                  href={`/products?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  View all results for &quot;{query}&quot; →
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-stone-500 text-sm font-medium">No botanical matches found for &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 mt-1">Try checking for typos or search for general keywords like &quot;Monstera&quot; or &quot;Ceramic&quot;</p>
              <Link
                href="/products"
                onClick={onClose}
                className="mt-4 inline-block text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-900 text-white hover:bg-emerald-800 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isInline) {
    return searchContent;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-24 px-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-900/10 max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-slide-up relative">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-900 tracking-wider uppercase">Live Botanical Search</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {searchContent}
      </div>
    </div>
  );
};

export default SearchBar;
