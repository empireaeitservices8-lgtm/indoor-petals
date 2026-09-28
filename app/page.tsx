'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Leaf,
  HeartHandshake,
  Star,
  CheckCircle2,
  PhoneCall,
  Search,
  Package,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { testimonialHighlights } from '@/data/reviews';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import PlantCareGuide from '@/components/PlantCareGuide';

export default function HomePage() {
  // Filter products by category for dedicated shelves
  const indoorPlants = products.filter((p) => p.category === 'indoor-plants');
  const artificialPlants = products.filter((p) => p.category === 'artificial-plants');
  const outdoorPlants = products.filter((p) => p.category === 'outdoor-plants');
  const tabletopPlants = products.filter((p) => p.category === 'tabletop-plants');
  const succulentsCactus = products.filter((p) => p.category === 'succulents-cactus');
  const ceramicPots = products.filter((p) => p.category === 'ceramic-pots');
  const plasticPots = products.filter((p) => p.category === 'plastic-pots-planters');
  const largePlants = products.filter((p) => p.category === 'large-plants');
  const fertilizers = products.filter((p) => p.category === 'plant-fertilizers');
  const clayBalls = products.filter((p) => p.category === 'clay-balls');
  const stonesPebbles = products.filter((p) => p.category === 'plant-stones-pebbles');

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="flex flex-col w-full">
      {/* 2. COMPACT & BALANCED HERO SECTION */}
      <section className="relative w-full bg-gradient-to-b from-[#04251a] via-[#064e3b] to-[#04251a] text-white overflow-hidden py-10 sm:py-12 lg:py-14">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-200 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Indoor Plants &amp; Gardening Solutions</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Bring Nature Into Your Space
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover beautiful indoor plants, stylish planters and complete gardening solutions from INDOOR PETALS.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <span>Explore Plants</span>
                  <ArrowRight className="w-4 h-4 text-emerald-800" />
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm border border-emerald-400/30 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                </Link>
              </div>


            </div>

            {/* Hero Right Visual Showcase (Strictly Contained & Balanced) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[420px] mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-400/20 bg-emerald-900/60 backdrop-blur-md p-3 group">
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden bg-emerald-950 flex items-center justify-center p-2">
                    <img
                      src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80"
                      alt="Monstera Deliciosa Indoor Plant"
                      className="w-full h-full max-h-full object-contain rounded-xl group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-700 font-bold">
                        Bestselling Plant
                      </span>
                      <h3 className="text-base font-bold mt-0.5">Monstera Deliciosa</h3>
                      <p className="text-[11px] text-emerald-200">With Artisanal Glazed Ceramic Pot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (All 13 Categories - Compact & Clean Grid) */}
      <section className="w-full py-10 sm:py-12 bg-stone-50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Botanical Collections
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-emerald-950 mt-1">
                Shop By Product Category
              </h2>
            </div>

            <Link
              href="/products"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean 13-Category Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200/70 hover:border-emerald-500/60 hover:shadow-sm transition-all duration-200"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-stone-50 mb-2 group-hover:scale-104 transition-transform duration-200">
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
                  <span className="absolute bottom-0.5 right-0.5 text-xs bg-white/90 rounded-md px-0.5 shadow-2xs">
                    {category.icon}
                  </span>
                </div>

                <h3 className="text-[11px] sm:text-xs font-bold text-stone-800 group-hover:text-emerald-800 line-clamp-1 leading-tight">
                  {category.name}
                </h3>
                <span className="text-[9.5px] text-stone-400 mt-0.5">
                  {category.itemCount} {category.itemCount === 1 ? 'Product' : 'Products'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Compact Grid) */}
      <section className="w-full py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Curated Specials
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-emerald-950 mt-1">
                Featured Plants &amp; Planters
              </h2>
            </div>
            <Link href="/products" className="text-xs font-bold text-emerald-800 hover:underline">
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR INDOOR PLANTS */}
      <section className="w-full py-10 sm:py-12 bg-emerald-50/30 border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪴</span>
              <div>
                <h2 className="text-base sm:text-xl font-black text-emerald-950">Popular Indoor Plants</h2>
                <p className="text-[11px] text-stone-500">Air-purifying foliage for living rooms &amp; bedrooms</p>
              </div>
            </div>
            <Link href="/products/indoor-plants" className="text-xs font-bold text-emerald-800 hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {indoorPlants.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. ARTIFICIAL & 7. OUTDOOR PLANTS */}
      <section className="w-full py-10 sm:py-12 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎋</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Artificial Plants</h2>
                  <p className="text-[11px] text-stone-500">Hyper-realistic faux plants with zero watering</p>
                </div>
              </div>
              <Link href="/products/artificial-plants" className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {artificialPlants.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌿</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Outdoor Plants</h2>
                  <p className="text-[11px] text-stone-500">Sun-loving flowering shrubs and balcony greens</p>
                </div>
              </div>
              <Link href="/products/outdoor-plants" className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {outdoorPlants.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TABLETOP & 9. SUCCULENTS & 10. BONSAI & 11. WATERPLANTS */}
      <section className="w-full py-10 sm:py-12 bg-stone-50 border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Tabletop Plants */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌱</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Tabletop Plants</h2>
                  <p className="text-[11px] text-stone-500">Compact desk buddies for study &amp; office tables</p>
                </div>
              </div>
              <Link href="/products/tabletop-plants" className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {tabletopPlants.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Succulents & Cactus */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌵</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Succulents &amp; Cactus</h2>
                  <p className="text-[11px] text-stone-500">Drought-tolerant geometric beauties for sunny sills</p>
                </div>
              </div>
              <Link href="/products/succulents-cactus" className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {succulentsCactus.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Large Plants */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌳</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Large Plants &amp; Statement Trees</h2>
                  <p className="text-[11px] text-stone-500">Mature specimen plants for living rooms and office corners</p>
                </div>
              </div>
              <Link href="/products/large-plants" className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {largePlants.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. POTS, FERTILIZERS, CLAY BALLS, PEBBLES, GIFTS & RENTAL */}
      <section className="w-full py-10 sm:py-12 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Ceramic & Plastic Planters */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏺</span>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-emerald-950">Artisanal Ceramic &amp; Plastic Pots</h2>
                  <p className="text-[11px] text-stone-500">Hand-glazed stoneware planters &amp; self-watering containers</p>
                </div>
              </div>
              <Link href="/products/ceramic-pots" className="text-xs font-bold text-emerald-800 hover:underline">
                View Pots →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {[...ceramicPots, ...plasticPots].slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Plant Care & Substrates */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-stone-200">
              <div>
                <h3 className="text-sm sm:text-base font-black text-emerald-950">
                  Organic Fertilizers, Hydroton Clay Balls &amp; Pebbles
                </h3>
                <p className="text-[11px] text-stone-500">Substrates &amp; tonics for thriving roots</p>
              </div>
              <div className="flex gap-2 text-xs font-bold text-emerald-800">
                <Link href="/products/plant-fertilizers" className="hover:underline">Fertilizers</Link>
                <span>•</span>
                <Link href="/products/clay-balls" className="hover:underline">Clay Balls</Link>
                <span>•</span>
                <Link href="/products/plant-stones-pebbles" className="hover:underline">Pebbles</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {[...fertilizers, ...clayBalls, ...stonesPebbles].slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 18. SERVICES SECTION (Compact Cards) */}
      <section className="w-full py-10 sm:py-14 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Professional Horticulture Services
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-emerald-950 mt-1">
              Gardening &amp; Plant Solutions
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Turnkey landscaping, maintenance subscriptions, commercial plant setup, and retail tabletop supply.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-emerald-950 text-white hover:bg-emerald-900 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>View All Services &amp; Request Inspection</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 19. WHY CHOOSE INDOOR PETALS */}
      <section className="w-full py-12 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900 px-2.5 py-0.5 rounded border border-emerald-700">
              Plant Care &amp; Service Standards
            </span>
            <h2 className="text-xl sm:text-3xl font-black mt-1">
              Why Choose INDOOR PETALS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/60">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold">Nursery-Acclimatized</h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Conditioned in shade houses to adapt well to living room indoor environments.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/60">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold">Protective Packing</h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Custom packaging designed to keep roots secure and protect foliage in transit.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/60">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold">Careful Handling</h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Dedicated support and replacement assistance for items damaged during transit.
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/60">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold">Plant Care Guidance</h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                WhatsApp plant care guidance and maintenance tips from our horticulture specialists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 20. PLANT CARE GUIDE */}
      <PlantCareGuide />

      {/* 21. CUSTOMER REVIEWS */}
      <section className="w-full py-12 bg-stone-50 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
              Customer Feedback
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
              Plant Parent Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonialHighlights.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-stone-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-8 h-8 rounded-full object-cover bg-stone-100"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.author)}&background=d1fae5&color=047857&size=80&bold=true`;
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{t.author}</h4>
                    <p className="text-[10px] text-emerald-700 font-medium">{t.role}</p>
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
