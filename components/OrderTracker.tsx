'use client';

import React, { useState } from 'react';
import { Order, OrderStatus } from '@/types';
import { Check, Clock, Package, Truck, Home, CreditCard, ShieldCheck, Search } from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const STATUS_STEPS: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'Order Placed', label: 'Order Placed', icon: Package },
  { status: 'Payment Confirmed', label: 'Payment Confirmed', icon: CreditCard },
  { status: 'Processing', label: 'Processing', icon: Clock },
  { status: 'Packed', label: 'Packed & Inspected', icon: ShieldCheck },
  { status: 'Shipped', label: 'Shipped', icon: Truck },
  { status: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'Delivered', label: 'Delivered', icon: Home },
];

interface OrderTrackerProps {
  initialOrder?: Order | null;
  className?: string;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  initialOrder = null,
  className = '',
}) => {
  const { orders } = useAuth();
  const [searchCode, setSearchCode] = useState(initialOrder?.orderNumber || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(initialOrder || orders[0] || null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchCode.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === q ||
        o.id.toLowerCase() === q ||
        o.customer.email.toLowerCase() === q
    );
    setActiveOrder(found || null);
    setSearched(true);
  };

  const getStepStatus = (stepIndex: number, currentStatus: OrderStatus) => {
    const currentIndex = STATUS_STEPS.findIndex((s) => s.status === currentStatus);
    if (currentIndex === -1) return 'pending';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className={`bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-xs ${className}`}>
      {/* Search Order Tracker Input */}
      <div className="max-w-xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Enter Order ID (e.g. IP-2026-98214) or Email..."
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs md:text-sm text-stone-900 focus:border-emerald-600 focus:bg-white outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs md:text-sm font-bold shadow-sm transition-colors shrink-0"
          >
            Track Order
          </button>
        </form>

        {searched && !activeOrder && (
          <p className="text-center text-xs text-rose-600 font-semibold mt-3">
            No order found matching &quot;{searchCode}&quot;. Please verify the Order ID or login to view your account orders.
          </p>
        )}
      </div>

      {activeOrder && (
        <div className="animate-fade-in space-y-8">
          {/* Order Header Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-950 text-white">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                  Tracking Live
                </span>
                <span className="text-xs text-emerald-300 font-semibold">Ordered on {formatDate(activeOrder.date)}</span>
              </div>
              <h3 className="text-lg md:text-xl font-black mt-1">Order #{activeOrder.orderNumber}</h3>
              <p className="text-xs text-stone-300">
                Delivery to {activeOrder.customer.shippingAddress.city}, {activeOrder.customer.shippingAddress.pincode}
              </p>
            </div>

            <div className="text-right md:self-center">
              <div className="text-xs text-stone-300">Current Status</div>
              <div className="text-base font-extrabold text-emerald-400">{activeOrder.orderStatus}</div>
              <div className="text-xs text-stone-300 mt-0.5">Est. Arrival: {activeOrder.estimatedDelivery}</div>
            </div>
          </div>

          {/* Visual Progress Stepper */}
          <div className="relative pt-4 pb-2">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-9 left-6 right-6 h-1 bg-stone-200 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative z-10">
              {STATUS_STEPS.map((step, idx) => {
                const state = getStepStatus(idx, activeOrder.orderStatus);
                const Icon = step.icon;

                return (
                  <div key={step.status} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        state === 'completed'
                          ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100'
                          : state === 'current'
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-md animate-pulse-subtle'
                          : 'bg-stone-100 text-stone-400 border border-stone-200'
                      }`}
                    >
                      {state === 'completed' ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          state === 'completed'
                            ? 'text-emerald-950'
                            : state === 'current'
                            ? 'text-amber-700 font-extrabold'
                            : 'text-stone-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-stone-400">
                        {state === 'completed' ? 'Done' : state === 'current' ? 'In Progress' : 'Upcoming'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Tracking Events Log */}
          {activeOrder.trackingUpdates && (
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-3">
                Tracking Activity Timeline
              </h4>
              <div className="space-y-3">
                {activeOrder.trackingUpdates.map((update, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">{update.status}</span>
                        <span className="text-stone-400 text-[11px]">{update.time}</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">{update.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ordered Products Items */}
          <div className="pt-4 border-t border-stone-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-3">
              Items in this shipment ({activeOrder.items.length})
            </h4>
            <div className="divide-y divide-stone-100">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name.slice(0, 2))}&background=d1fae5&color=047857&size=80&bold=true`;
                      }}
                    />
                    <div>
                      <h5 className="text-xs font-bold text-stone-900">{item.name}</h5>
                      <span className="text-[11px] text-stone-500">Qty: {item.quantity} • {item.potType}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-950">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
