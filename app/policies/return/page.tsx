import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Return Policy | INDOOR PETALS',
  description: 'Return policy guidelines for indoor plants, ceramic pots, fertilizers, and accessories from INDOOR PETALS.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black">Return Policy</h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Last updated: September 2026 • INDOOR PETALS Customer Protection
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-700" />
              1. Non-Plant Products (Pots, Fertilizers, Accessories)
            </h2>
            <p>
              Non-living goods including ceramic planters, plastic pots, clay hydroton balls, plant stones, and unopened fertilizer packs are eligible for return within <strong>7 days of delivery</strong> provided they are unused, in original condition, and in their original packaging.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              2. Live Plants Returns Policy
            </h2>
            <p>
              Due to the perishable nature of live plants, we do not accept traditional return pickups of living plants once accepted by the customer. However, all live plants are 100% protected under our <strong>7-Day Transit Plant Replacement Policy</strong>. If your plant arrives damaged or unhealthy, we will replace it free of charge.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              3. How to Initiate a Return Request
            </h2>
            <p>
              To initiate a return for non-living items or report damaged goods:<br />
              1. Email us at <strong className="text-emerald-950">care@indoorpetals.com</strong> or WhatsApp our support line at <strong className="text-emerald-950">+91 98765 43210</strong>.<br />
              2. Mention your Order Number (e.g. IP-2026-98214) and attach a clear photo of the unboxed package.<br />
              3. Our team will arrange a reverse pickup within 2-3 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
