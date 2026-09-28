import React from 'react';
import Link from 'next/link';
import { CreditCard, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | INDOOR PETALS',
  description: 'Learn about refund processing timelines and methods for cancelled or returned orders at INDOOR PETALS.',
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black">Refund Policy</h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Last updated: September 2026 • INDOOR PETALS Payment Protections
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              1. Refund Eligibility &amp; Criteria
            </h2>
            <p>
              Refunds are issued under the following circumstances:<br />
              - An order is cancelled prior to shipment dispatch.<br />
              - An item is confirmed damaged or out-of-stock and customer chooses a refund over replacement.<br />
              - Non-living items (pots, tools, pebbles) returned in unused condition within 7 days.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-700" />
              2. Refund Mode &amp; Processing Timelines
            </h2>
            <p>
              - <strong>UPI &amp; Net Banking Refunds:</strong> Processed directly back to the original bank account via Razorpay within <strong>3 to 5 business days</strong>.<br />
              - <strong>Credit / Debit Card Refunds:</strong> Credited back to the card within <strong>5 to 7 business days</strong> depending on the issuing bank.<br />
              - <strong>Cash on Delivery (COD) Orders:</strong> Customer can provide their UPI ID or NEFT bank details for direct transfer within 48 hours.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              3. Store Credit Option
            </h2>
            <p>
              Customers may also opt for instant <strong>INDOOR PETALS Store Credit Coupon</strong>, which is generated instantly with no expiry date and an extra 5% bonus top-up for future plant purchases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
