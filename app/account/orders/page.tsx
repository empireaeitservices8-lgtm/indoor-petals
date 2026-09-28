'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { formatINR, formatDate } from '@/lib/utils';
import { Package, ArrowLeft, ChevronRight, Truck, CheckCircle2 } from 'lucide-react';

export default function MyOrdersPage() {
  const { orders, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Please Sign In</h2>
        <p className="text-stone-500 text-xs sm:text-sm">
          Sign in to view your complete order history and shipment tracking.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-xl bg-emerald-950 text-white font-bold text-xs sm:text-sm"
        >
          Sign In
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
            <Link href="/account" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Account Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black">My Orders</h1>
            <p className="text-xs text-emerald-200 mt-0.5">{orders.length} orders placed</p>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-stone-900">Order #{order.orderNumber}</span>
                      <span className="text-[11px] font-semibold text-stone-400">• Placed on {formatDate(order.date)}</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Delivery to {order.customer.shippingAddress.city}, {order.customer.shippingAddress.pincode}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                      ● {order.orderStatus}
                    </span>
                    <Link
                      href="/order-tracking"
                      className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-stone-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name.slice(0, 2))}&background=d1fae5&color=047857&size=80&bold=true`;
                          }}
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900">{item.name}</h4>
                          <span className="text-[11px] text-stone-500">Qty: {item.quantity} • {item.potType}</span>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-950">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer total */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-stone-500">
                    Payment Method: <strong className="text-stone-800">{order.paymentMethod}</strong> ({order.paymentStatus})
                  </div>
                  <div className="text-sm font-black text-emerald-950">
                    Total: <span className="text-emerald-900 text-base">{formatINR(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900">No orders yet</h3>
            <p className="text-xs text-stone-500 mt-1">You haven&apos;t placed any plant orders yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-emerald-950 text-white font-bold text-xs"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
