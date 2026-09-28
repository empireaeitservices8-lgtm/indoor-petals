'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, WishlistItem } from '@/types';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => boolean; // returns true if now added, false if removed
  isInWishlist: (productId: string) => boolean;
  moveToCart: (product: Product) => void;
  clearWishlist: () => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('indoorpetals_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('indoorpetals_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist, isInitialized]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (product: Product): boolean => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        clearWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
