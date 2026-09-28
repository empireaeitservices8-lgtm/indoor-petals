import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, ArrowLeft, PackageCheck } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | INDOOR PETALS',
  description: 'Shipping timelines, honeycomb packaging safety, delivery charges, and pincode coverage for INDOOR PETALS.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black">Shipping &amp; Delivery Policy</h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Last updated: September 2026 • INDOOR PETALS Botanical Deliveries
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-700" />
              1. Specialized Live Plant Packaging
            </h2>
            <p>
              Plants are delicate living organisms. At <strong>INDOOR PETALS</strong>, we have engineered a proprietary breathable, shock-absorbing honeycomb packaging system. Pots are securely locked at the base to prevent soil spillage, and foliage is cushioned against transit friction while allowing adequate air exchange.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-700" />
              2. Processing &amp; Dispatch Timeline
            </h2>
            <p>
              - Orders placed before 1:00 PM are inspected by our horticulturists, watered appropriately, and dispatched within <strong>24 to 48 hours</strong>.<br />
              - Orders placed on Saturday afternoon or Sunday are dispatched on Monday to prevent plants from sitting in weekend transit hubs.<br />
              - Kerala region deliveries typically arrive within <strong>1 to 2 business days</strong>.<br />
              - Metro and Tier-1 cities across India arrive within <strong>3 to 5 business days</strong>.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" />
              3. Delivery Charges &amp; Free Shipping
            </h2>
            <p>
              - <strong>Free Standard Delivery:</strong> Applicable on all cart values of <strong>₹999 and above</strong> anywhere in India.<br />
              - <strong>Standard Shipping:</strong> A flat delivery fee of ₹79 is applied on orders below ₹999.<br />
              - <strong>Large Specimen Plants &amp; Bulk Planters:</strong> Delivery charges for extra-large trees (5ft+) or bulk ceramic planters are calculated at checkout based on weight and distance.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              4. Order Tracking &amp; Delivery Notification
            </h2>
            <p>
              Once your shipment is dispatched, you will receive real-time SMS and WhatsApp notifications containing your tracking link. You can also track your shipment anytime via our <Link href="/order-tracking" className="text-emerald-800 font-bold underline">Order Tracking Page</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
