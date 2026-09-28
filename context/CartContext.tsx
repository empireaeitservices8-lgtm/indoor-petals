'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '@/types';
import { validCoupons } from '@/data/coupons';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, potType?: string, plantSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingCharge: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('indoorpetals_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('indoorpetals_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('indoorpetals_cart', JSON.stringify(cart));
      if (appliedCoupon) {
        localStorage.setItem('indoorpetals_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('indoorpetals_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart, appliedCoupon, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1, potType?: string, plantSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          selectedPotType: potType || updated[existingIndex].selectedPotType,
          selectedPlantSize: plantSize || updated[existingIndex].selectedPlantSize,
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedPotType: potType || product.potType,
          selectedPlantSize: plantSize || product.plantSize,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (subtotal * appliedCoupon.discountValue) / 100;
      discount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  // Free shipping over ₹999
  const shippingCharge = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const finalTotal = Math.max(0, subtotal - discount + shippingCharge);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = validCoupons.find((c) => c.code === formatted);

    if (!found) {
      return { success: false, message: `Coupon code "${code}" is invalid or expired.` };
    }

    if (subtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minSpend} required to use "${found.code}". Add more items to qualify!`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Promo code "${found.code}" applied successfully! You saved on this order.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingCharge,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
