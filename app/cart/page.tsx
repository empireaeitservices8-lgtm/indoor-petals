'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { getWhatsAppCartOrderUrl } from '@/lib/whatsapp';
import PincodeChecker from '@/components/PincodeChecker';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingCharge,
    finalTotal,
    totalItems,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res);
    if (res.success) setCouponCode('');
  };

  const whatsAppOrderUrl = getWhatsAppCartOrderUrl(cart, finalTotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-3xl mb-4">
          🪴
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
          Explore our collection of fresh indoor plants, handmade ceramic planters, tabletop decor, and organic plant tonics.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-950 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Catalog &amp; Shop</span>
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
            <h1 className="text-2xl sm:text-3xl font-black">Shopping Bag</h1>
            <p className="text-xs text-emerald-200 mt-0.5">{totalItems} botanical {totalItems === 1 ? 'item' : 'items'} selected</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-300 hover:text-rose-100 underline font-medium"
          >
            Clear Entire Bag
          </button>
        </div>
      </section>

      {/* Cart Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200/70 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-2">
                {remainingForFreeShipping === 0 ? (
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    You qualified for FREE Standard Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatINR(remainingForFreeShipping)}</strong> more to get Free Delivery
                  </span>
                )}
                <span className="text-xs font-black text-emerald-800">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.product.categoryName)}&background=d1fae5&color=047857&size=120&bold=true`;
                      }}
                    />
                    <div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                        {item.product.productCode}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 mt-1">{item.product.name}</h3>
                      <p className="text-xs text-stone-500">{item.selectedPotType || item.product.potType}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-black text-emerald-950">{formatINR(item.product.price)}</span>
                        <span className="text-xs text-stone-400 line-through">{formatINR(item.product.mrp)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                    <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-stone-200 text-stone-600 rounded-l-xl"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-stone-200 text-stone-600 rounded-r-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-emerald-950 min-w-[70px] text-right">
                      {formatINR(item.product.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pincode Checker */}
            <PincodeChecker />
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-md space-y-5 sticky top-28">
            <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Order Summary
            </h2>

            {/* Coupon Code */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Have a Coupon Code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 ml-1 font-semibold">(-{formatINR(discount)})</span>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-xs font-bold text-rose-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. GREEN10, PETALS20"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 text-xs uppercase font-bold outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMsg && (
                <p className={`text-[11px] mt-1 font-medium ${couponMsg.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponMsg.message}
                </p>
              )}
            </div>

            {/* Financial Calculations */}
            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-stone-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className={shippingCharge === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-stone-900'}>
                  {shippingCharge === 0 ? 'FREE' : formatINR(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-emerald-950 pt-3 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="text-xl text-emerald-900">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="space-y-2.5 pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsAppOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Quick Order on WhatsApp</span>
              </a>

              <Link
                href="/products"
                className="block text-center text-xs font-semibold text-stone-500 hover:text-emerald-800 pt-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
