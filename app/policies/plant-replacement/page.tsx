import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Leaf, ArrowLeft, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Plant Replacement Policy | INDOOR PETALS',
  description: 'Learn about the 7-day live transit replacement guarantee offered on all INDOOR PETALS plants.',
};

export default function PlantReplacementPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black">Plant Replacement Policy</h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Our 100% Live Arrival &amp; 7-Day Botanical Health Promise
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              1. The 7-Day Live Plant Guarantee
            </h2>
            <p>
              We know ordering live plants online requires trust. Every plant leaving INDOOR PETALS is pest-free, well-rooted, and hydrated. We guarantee that your plant will arrive in healthy condition and stay vibrant for at least <strong>7 days after delivery</strong> when cared for per instructions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-700" />
              2. What Qualifies for a Free Replacement?
            </h2>
            <p>
              A complimentary replacement specimen will be dispatched if your plant shows:<br />
              - Broken main stems, severe structural root breakage, or crushed foliage caused in transit.<br />
              - Severe unrecoverable root rot or fungal disease within 7 days of arrival.<br />
              - Incorrect plant species or noticeably wrong pot variant delivered.
            </p>
            <p className="text-stone-500 italic">
              * Note: Minor cosmetic leaf yellowing or single fallen leaf is normal acclimation stress during transit and easily pruned.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-700" />
              3. Simple 24-Hour Claim Process
            </h2>
            <p>
              1. Take 2 clear photos of the damaged plant and the outer packaging.<br />
              2. Send them via WhatsApp to <strong className="text-emerald-950">+91 98765 43210</strong> or email <strong className="text-emerald-950">care@indoorpetals.com</strong> along with your Order ID.<br />
              3. Our head horticulturist will assess the claim within 4 hours and approve a fresh replacement dispatched immediately at zero additional cost.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
