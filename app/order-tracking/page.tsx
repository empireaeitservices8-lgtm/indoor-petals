import React from 'react';
import OrderTracker from '@/components/OrderTracker';
import { Package, ShieldCheck, Truck } from 'lucide-react';

export const metadata = {
  title: 'Live Order Tracking | INDOOR PETALS',
  description: 'Track the real-time shipping and delivery status of your INDOOR PETALS plant orders.',
};

export default function OrderTrackingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-700 font-bold">
            Live Logistics
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Track Your Plant Shipment</h1>
        </div>
      </section>

      {/* Main Order Tracker Component */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <OrderTracker />

        {/* Quick FAQ / Safe Transit Promise */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              Specialized Honeycomb Packaging
            </h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Every houseplant is secured in ventilated, shock-damped cartons to protect fragile stems and moisture retention.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              Express Climate Controlled Transit
            </h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Dispatched via priority logistics partners to ensure plants reach your home in top horticultural condition.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              7-Day Transit Health Guarantee
            </h4>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              If your plant exhibits shipping distress upon arrival, send us a photo for immediate free replacement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
