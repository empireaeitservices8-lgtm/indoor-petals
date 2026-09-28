'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { getWhatsAppCartOrderUrl } from '@/lib/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingCharge,
    finalTotal,
    totalItems,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const whatsAppOrderUrl = getWhatsAppCartOrderUrl(cart, finalTotal);

  return (
    <div className="fixed inset-0 z-[150] flex justify-end bg-emerald-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-up relative">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900 leading-tight">Your Plant Bag</h3>
              <p className="text-xs text-stone-400">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-emerald-50/80 px-5 py-3 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-950 mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="flex items-center gap-1 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Congratulations! You qualified for FREE Delivery!
              </span>
            ) : (
              <span>Add <strong className="text-emerald-800">{formatINR(remainingForFreeShipping)}</strong> more for FREE shipping</span>
            )}
            <span className="text-[11px] font-bold text-emerald-800">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/60 relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-xl object-cover bg-white shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.product.categoryName)}&background=d1fae5&color=047857&size=80&bold=true`;
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">{item.selectedPotType || item.product.potType}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-white shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-emerald-950">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors self-start"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl mb-3">
                🪴
              </div>
              <h4 className="text-base font-bold text-stone-900">Your bag is empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our indoor plants, designer ceramic pots, and garden accessories to fill your home with green living.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold shadow-sm hover:bg-emerald-800"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-white space-y-3.5 shadow-lg">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 ml-1.5 font-medium">(-{formatINR(discount)})</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. GREEN10)"
                      className="w-full px-3 py-2 text-xs uppercase font-semibold rounded-xl border border-stone-200 focus:border-emerald-600 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p className={`text-[11px] mt-1 font-medium ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingCharge === 0 ? 'text-emerald-700 font-bold' : 'font-semibold text-stone-900'}>
                  {shippingCharge === 0 ? 'FREE' : formatINR(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-emerald-950 pt-2 border-t border-stone-100">
                <span>Total Amount</span>
                <span className="text-base text-emerald-900">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex gap-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-center text-xs font-bold transition-colors"
                >
                  View Full Cart
                </Link>
                <a
                  href={whatsAppOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-center text-xs font-bold border border-emerald-200 transition-colors"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
