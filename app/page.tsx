'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  Building2,
  Store,
  Hotel,
  UtensilsCrossed,
  Layers,
  Calendar,
  Check,
  Star,
  Quote,
  Truck,
  ShieldCheck,
  Leaf,
  HeartHandshake,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { validCoupons } from '@/data/coupons';
import { testimonialHighlights } from '@/data/reviews';
import ProductCard from '@/components/ProductCard';
import { getWhatsAppGeneralHelpUrl, getWhatsAppServiceEnquiryUrl } from '@/lib/whatsapp';

export default function HomePage() {
  // WhatsApp Links
  const whatsAppGeneralUrl = getWhatsAppGeneralHelpUrl();
  const plantRentalService = services.find((s) => s.slug === 'plant-rental-service') || services[0];
  const whatsAppRentalQuoteUrl = getWhatsAppServiceEnquiryUrl(
    plantRentalService,
    'Hello INDOOR PETALS, I would like to get a customized Plant Rental quote for our office / commercial space.'
  );
  const landscapingService = services.find((s) => s.slug === 'landscaping') || services[1];

  // SHOP BY CATEGORY — Exactly the 8 required categories in requested order
  const homepageCategorySlugs = [
    'indoor-plants',
    'tabletop-plants',
    'large-plants',
    'ceramic-pots',
    'outdoor-plants',
    'artificial-plants',
    'plant-fertilizers',
    'plant-accessories',
  ];
  const homepageCategories = homepageCategorySlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories;

  // BEST SELLING — featured/popular products
  const bestSellingProducts = products.filter((p) => p.featured || p.popular).slice(0, 8);

  // WHY INDOOR PETALS benefits (Exactly 5 cards)
  const whyUsBenefits = [
    {
      icon: '🌱',
      title: 'Quality Plants',
      desc: 'Healthy and carefully selected plants',
    },
    {
      icon: '🏺',
      title: 'Stylish Pots',
      desc: 'Ceramic & other planter options',
    },
    {
      icon: '🚚',
      title: 'Safe Delivery',
      desc: 'Careful handling and delivery',
    },
    {
      icon: '💬',
      title: 'Plant Care Support',
      desc: 'Guidance for plant care and maintenance',
    },
    {
      icon: '🏢',
      title: 'Business Solutions',
      desc: 'Rental, maintenance & commercial plant supply',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ==================================================
          PROMOTION / OFFER BAR
          ================================================== */}
      {validCoupons && validCoupons.length > 0 && (
        <section
          aria-label="Promotional Offers"
          className="w-full bg-[#04251a] border-b border-emerald-800/50 text-white select-none relative z-20 overflow-hidden"
        >
          <div className="flex items-center h-10 sm:h-11">
            {/* Static Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-4 h-full bg-emerald-900/90 text-amber-300 text-[11px] font-extrabold tracking-wider uppercase shrink-0 z-10 border-r border-emerald-700/50">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>OFFERS</span>
            </div>

            {/* Marquee Ticker */}
            <div className="overflow-hidden whitespace-nowrap flex-1 h-full flex items-center px-2 sm:px-3">
              <div className="animate-marquee flex items-center gap-12 sm:gap-14">
                {[...validCoupons, ...validCoupons].map((coupon, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2.5 shrink-0 py-0.5">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/35 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wide shrink-0">
                      {coupon.code}
                    </span>
                    <span className="text-emerald-100/95 text-xs font-medium leading-none">{coupon.description}</span>
                    <span className="text-emerald-500/40 font-bold ml-2 shrink-0">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative w-full bg-gradient-to-br from-[#04251a] via-[#064e3b] to-[#0a3d2e] text-white overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] bg-amber-400/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* LEFT — Hero Content (wide enough on desktop for single-line heading) */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              {/* Category Line */}
              <p className="text-[11px] sm:text-xs font-bold text-amber-300/90 tracking-[0.15em] uppercase">
                Indoor Plants • Plant Rental • Landscaping • Plant Maintenance
              </p>

              {/* Main Heading — single line on desktop, pure #FFFFFF across all words */}
              <h1 className="hero-heading text-white">
                Bring Nature Into Your Space
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-emerald-100/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Beautiful plants and complete greenery solutions for homes, offices and commercial spaces.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/products"
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span>Shop Plants</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="#plant-rental"
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-bold text-sm border border-emerald-500/25 shadow-md transition-all duration-200 inline-flex items-center gap-2"
                >
                  <span>Plant Rental</span>
                </a>

                <a
                  href={whatsAppGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* RIGHT — Hero Product Visual */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[300px] xl:max-w-[340px]">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-emerald-400/20 bg-emerald-900/50 backdrop-blur-sm p-2.5 group">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80"
                      alt="Monstera Deliciosa Indoor Statement Plant"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-700/80 font-bold inline-block backdrop-blur-sm">
                        Bestselling • IP-IND-101
                      </span>
                      <h3 className="text-base sm:text-lg font-bold mt-1.5 leading-tight">Monstera Deliciosa</h3>
                      <p className="text-[11px] text-emerald-200/80 mt-0.5">With Artisanal Glazed Ceramic Pot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. QUICK SERVICE CARDS (Immediately Below Hero)
          ================================================== */}
      <section className="w-full py-6 sm:py-8 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 1: Indoor Plants */}
            <Link
              href="/products/indoor-plants"
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:shadow-md transition-all duration-200 group flex items-start gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                🌱
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Indoor Plants
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  Beautiful plants for your home &amp; office
                </p>
              </div>
            </Link>

            {/* Card 2: Plant Rental */}
            <a
              href="#plant-rental"
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:shadow-md transition-all duration-200 group flex items-start gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                🏢
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Plant Rental
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  Plants with regular maintenance
                </p>
              </div>
            </a>

            {/* Card 3: Landscaping */}
            <a
              href="#landscaping"
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:shadow-md transition-all duration-200 group flex items-start gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                🌿
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Landscaping
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  Home, balcony &amp; commercial spaces
                </p>
              </div>
            </a>

            {/* Card 4: Plant Maintenance */}
            <Link
              href="/services"
              className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:shadow-md transition-all duration-200 group flex items-start gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                🪴
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  Plant Maintenance
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                  Regular care for healthy plants
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. SHOP BY CATEGORY (Single Section — 8 Categories)
          ================================================== */}
      <section className="w-full py-12 sm:py-16 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Botanical Collections
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-3">
              Shop By Category
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Explore our most popular plant and gardening collections
            </p>
          </div>

          {/* 8 Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
            {homepageCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                      const parent = el.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
                      }
                    }}
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <span className="text-[10px] text-stone-400 mt-0.5">
                  {category.itemCount} {category.itemCount === 1 ? 'Product' : 'Products'}
                </span>
              </Link>
            ))}
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 border border-stone-200 hover:border-emerald-300 text-xs sm:text-sm font-bold transition-all shadow-sm group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. BEST SELLING PLANTS
          ================================================== */}
      <section className="w-full py-12 sm:py-16 bg-[#faf8f5] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Curated Picks
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-3">
                Best Selling Plants
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Healthy, acclimatized indoor foliage with artisan planters
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-stone-200 hover:border-emerald-300 text-xs font-bold transition-colors shrink-0 shadow-sm"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {bestSellingProducts.map((p) => (
              <ProductCard key={p.id} product={p} showViewDetails={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. PLANT RENTAL SECTION
          ================================================== */}
      <section id="plant-rental" className="w-full py-12 sm:py-16 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#04251a] via-[#064e3b] to-[#0a3d2e] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-700/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/25 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-amber-300" />
                    Corporate &amp; Commercial Greenery
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-4 leading-tight">
                    Plant Rental for Offices &amp; Commercial Spaces
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-100/80 mt-3 leading-relaxed max-w-lg">
                    Add beautiful greenery to your workspace without the hassle of buying and maintaining plants.
                  </p>
                </div>

                {/* Exactly 5 Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Tabletop Plants',
                    'Large Indoor Plants',
                    'Ceramic & Plastic Pots',
                    'Regular Maintenance',
                    'Plant Replacement Support',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-emerald-100/90 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-300" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Perfect for */}
                <div className="pt-4 border-t border-emerald-700/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 mb-2.5">
                    Perfect for:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Offices', icon: Building2 },
                      { name: 'Shops', icon: Store },
                      { name: 'Hotels', icon: Hotel },
                      { name: 'Restaurants', icon: UtensilsCrossed },
                      { name: 'Showrooms', icon: Layers },
                      { name: 'Events', icon: Calendar },
                    ].map((target, idx) => {
                      const Icon = target.icon;
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900/70 border border-emerald-600/30 text-emerald-100/90 text-xs font-medium"
                        >
                          <Icon className="w-3 h-3 text-amber-300/80" />
                          {target.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Exact Button */}
                <a
                  href={whatsAppRentalQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-7 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-800 text-transparent" />
                  <span>Get Plant Rental Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-emerald-400/15 shadow-2xl">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"
                      alt="Corporate Plant Rental Office Setup"
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-emerald-950/70 backdrop-blur-sm border border-emerald-700/40">
                      <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
                        Zero Hassle Leasing
                      </span>
                      <p className="text-xs text-emerald-100/80 mt-0.5">
                        Weekly maintenance &amp; free plant swaps included.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. LANDSCAPING SECTION
          ================================================== */}
      <section id="landscaping" className="w-full py-12 sm:py-16 bg-[#faf8f5] border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Landscaping &amp; Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-950 mt-3 leading-tight">
                  Create Your Perfect Green Space
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
                  From small balconies to commercial spaces, we help you create beautiful and functional green areas.
                </p>
              </div>

              {/* Exactly 6 Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'Home Landscaping',
                  'Balcony Gardening',
                  'Terrace Gardening',
                  'Office Landscaping',
                  'Garden Setup',
                  'Plant Maintenance',
                ].map((serviceName, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/70 shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-stone-800">{serviceName}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/services"
                  className="h-11 sm:h-12 px-7 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span>View Landscaping Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 relative group bg-stone-100">
                <img
                  src={landscapingService.image}
                  alt="Beautiful Landscaping by INDOOR PETALS"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.src = 'https://images.unsplash.com/photo-1621151426120-54f14ddd34da?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] font-mono uppercase bg-emerald-800/90 px-2 py-0.5 rounded font-bold backdrop-blur-xs">
                    Turnkey Green Spaces
                  </span>
                  <p className="text-sm font-bold mt-1">Balconies • Courtyards • Commercial Lawns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. WHY INDOOR PETALS?
          ================================================== */}
      <section className="w-full py-12 sm:py-16 bg-white border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              The Indoor Petals Difference
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-3">
              WHY INDOOR PETALS?
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Trusted by hundreds of customers for premium plant quality, expert care support, and reliable delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {whyUsBenefits.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-stone-50/80 border border-stone-200/70 hover:border-emerald-500/40 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors text-xl">
                    <span>{item.icon}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. PROMOTIONAL CTA
          ================================================== */}
      <section className="w-full py-12 sm:py-16 bg-gradient-to-br from-[#04251a] via-[#064e3b] to-[#0a3d2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
              Transform Your Space with <span className="text-emerald-300">Indoor Petals</span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/70 mt-4 leading-relaxed">
              Whether you need a single desk plant or a complete corporate greenery setup, we have the expertise and selection to bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link
                href="/products"
                className="h-11 sm:h-12 px-7 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm shadow-lg transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 sm:h-12 px-7 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-lg transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-transparent" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CUSTOMER REVIEWS / TESTIMONIALS
          ================================================== */}
      <section className="w-full py-12 sm:py-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Customer Love
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonialHighlights.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-7 h-7 text-emerald-200 mb-3" />
                  <p className="text-sm text-stone-700 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100"
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{testimonial.author}</h4>
                    <p className="text-[11px] text-stone-400 truncate">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5 shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
