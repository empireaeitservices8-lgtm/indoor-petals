import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | INDOOR PETALS',
  description: 'How INDOOR PETALS collects, protects, and handles customer personal data and payment security.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Last updated: September 2026 • INDOOR PETALS Privacy Commitments
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-700" />
              1. Information We Collect
            </h2>
            <p>
              When you purchase plants, schedule landscaping consultations, or register an account with <strong>INDOOR PETALS</strong>, we collect your name, email address, contact phone number, delivery address, and pincode solely to process orders, coordinate shipping, and send order tracking updates.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              2. Payment Security &amp; Razorpay Gateway
            </h2>
            <p>
              We do <strong>not</strong> store your credit card numbers, CVVs, UPI PINs, or net banking credentials on our servers. All financial transactions are processed securely through PCI-DSS Level 1 compliant payment gateways (Razorpay) utilizing 256-bit SSL encryption.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-700" />
              3. Data Protection &amp; Third Parties
            </h2>
            <p>
              We never sell or lease your personal information to third-party advertisers. Your information is shared only with verified logistics delivery couriers to complete plant shipment handoffs and with our horticulturists to provide customer service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              4. Contact the Data Protection Team
            </h2>
            <p>
              If you have any questions or wish to request deletion of your account information, contact our privacy officer at <strong className="text-emerald-950">privacy@indoorpetals.com</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
