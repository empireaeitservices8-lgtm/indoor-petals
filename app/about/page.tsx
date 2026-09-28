import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, HeartHandshake, Award, Truck, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'About Us | INDOOR PETALS - Indoor Plants & Gardening Solutions',
  description: 'Learn about INDOOR PETALS, your trusted partner for nursery-grown indoor plants, designer planters, plant rental, garden maintenance, and bespoke landscaping services.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section className="bg-emerald-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-3.5 py-1 rounded-full border border-emerald-700">
            Our Story &amp; Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4">
            About INDOOR PETALS
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-4 leading-relaxed">
            Indoor plants, planters, plant-care products, plant rental, landscaping &amp; garden maintenance services എന്നിവ നൽകുന്ന professional plant business.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nurturing Green Sanctuaries</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 leading-tight">
                Bringing Nature, Freshness &amp; Green Living into Modern Spaces
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                At <strong>INDOOR PETALS</strong>, we believe that integrating living greenery into your daily surroundings isn’t merely decorative—it is essential for mental wellness, air purity, and a calmer lifestyle.
              </p>

              <p className="text-sm text-stone-600 leading-relaxed">
                Founded with a deep passion for botanical design and horticulture science, we provide complete indoor and outdoor greening solutions under one roof:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '🪴 Healthy Indoor & Outdoor Plants',
                  '🏺 Handcrafted & Self-Watering Planters',
                  '🌱 Organic Plant-Care Fertilizers',
                  '🔄 Flexible Plant Rental Services',
                  '🌿 Residential & Commercial Landscaping',
                  '✂️ Recurring Garden Maintenance'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs font-bold text-stone-800">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80"
                  alt="INDOOR PETALS Botanical Greenhouse"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-900 text-white p-4 rounded-2xl shadow-xl hidden sm:block border border-emerald-700">
                <span className="text-lg font-black text-amber-300">Botanical Care</span>
                <p className="text-xs text-emerald-200">Healthy Plants for Homes &amp; Workspaces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Brand Pillars */}
      <section className="py-16 bg-stone-50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              What We Stand For
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 mt-3">
              The INDOOR PETALS Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                  🌱
                </div>
                <h3 className="text-lg font-bold text-stone-900">Nursery-Fresh Acclimatization</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  All our specimens are conditioned in shade houses to adapt naturally to indoor living spaces.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-stone-900">Protective Packing &amp; Support</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Every order is packed with shock-absorbing materials, with prompt replacement assistance for transit damages.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xl mb-4">
                  🌿
                </div>
                <h3 className="text-lg font-bold text-stone-900">Turnkey Horticultural Support</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  From corporate office plant setups and event rentals to ongoing garden maintenance, our certified horticulturists take care of your greenery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Locations & Studio Centers */}
      <section className="py-16 bg-white border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Visit Us In Person
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 mt-3">
              Our Botanical Locations
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Walk through our greenhouses or consult with our landscape architects at our branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Location 1 */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-white">
                Location 1
              </span>
              <h3 className="text-lg font-black text-emerald-950 mt-1">Peyad, Thachottukavu</h3>
              <p className="text-xs text-stone-600">
                Main plant nursery, greenhouse acclimatization, and retail plant showroom.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-900 flex items-center gap-3">
                <a href="tel:9946718868" className="hover:underline">📞 9946718868</a>
                <span>•</span>
                <a href="tel:9645718868" className="hover:underline">📞 9645718868</a>
              </div>
            </div>

            {/* Location 2 */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-white">
                Location 2
              </span>
              <h3 className="text-lg font-black text-emerald-950 mt-1">Kazhakootam, Karyavattom - Chenkottukonam</h3>
              <p className="text-xs text-stone-600">
                Landscape architecture consultation, commercial plant rental &amp; garden care center.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-900 flex items-center gap-3">
                <a href="mailto:indoorpetals@gmail.com" className="hover:underline">✉️ indoorpetals@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-emerald-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">Ready to Green Your Space?</h2>
          <p className="text-xs sm:text-sm text-emerald-200">
            Browse our catalog of fresh indoor plants or contact our landscape team for custom consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-100 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm border border-emerald-600 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
