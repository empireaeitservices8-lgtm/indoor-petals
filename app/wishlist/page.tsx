'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-3xl mb-4">
          <Heart className="w-10 h-10 fill-rose-100 text-rose-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">Your Wishlist is Empty</h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          Save your favorite houseplants, ceramic pots, and garden accessories to your wishlist to buy them later.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-950 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Botanical Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>Saved Plant Favorites</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">My Wishlist</h1>
            <p className="text-xs text-emerald-200 mt-0.5">{wishlist.length} saved botanical {wishlist.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-rose-300 hover:text-rose-100 underline font-medium"
          >
            Clear Wishlist
          </button>
        </div>
      </section>

      {/* Grid of Wishlist Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(({ product }) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => moveToCart(product)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
