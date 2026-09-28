'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/data/products';
import {
  Star,
  ShieldCheck,
  Truck,
  Droplet,
  Sun,
  Ruler,
  Maximize2,
  Plus,
  Minus,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Package,
} from 'lucide-react';
import { formatINR, calculateDiscount } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';
import BuyNowButton from '@/components/BuyNowButton';
import WishlistButton from '@/components/WishlistButton';
import WhatsAppEnquiryButton from '@/components/WhatsAppEnquiryButton';
import PincodeChecker from '@/components/PincodeChecker';
import ReviewSection from '@/components/ReviewSection';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedPotType, setSelectedPotType] = useState<string>(product?.potType || '');

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
        <p className="text-stone-500 mt-2">The requested botanical item is no longer available.</p>
        <Link
          href="/products"
          className="mt-4 inline-block px-6 py-3 rounded-xl bg-emerald-900 text-white font-bold text-sm"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const discountPercent = calculateDiscount(product.price, product.mrp);

  // Related & Similar products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const similarProducts = products
    .filter((p) => p.category !== product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <Link href="/products" className="hover:text-emerald-800 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <Link href={`/products/${product.category}`} className="hover:text-emerald-800 transition-colors font-medium">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Image Gallery (Constrained to ~420px max height for clean balance) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            <div className="relative w-full max-w-[460px] mx-auto h-[340px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm group flex items-center justify-center p-2">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-contain sm:object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.categoryName)}&background=d1fae5&color=047857&size=400&bold=true`;
                }}
              />

              {/* Discount Tag */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black tracking-wider uppercase shadow-md">
                  {discountPercent}% OFF
                </div>
              )}

              {/* Wishlist Top Right */}
              <div className="absolute top-4 right-4">
                <WishlistButton product={product} size="lg" />
              </div>

              {/* Stock Status Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-900 border border-emerald-100 shadow-sm">
                ● {product.availability} ({product.stock} units available)
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      (selectedImage || product.image) === img
                        ? 'border-emerald-700 shadow-md ring-2 ring-emerald-200'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(String(idx + 1))}&background=d1fae5&color=047857&size=100&bold=true`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Protective Transit Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 flex items-center gap-3.5">
              <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0" />
              <div className="text-xs text-stone-700">
                <strong className="text-emerald-950 font-bold block">Careful Plant Packaging &amp; Support</strong>
                Every plant is protected with shock-absorbent packaging with dedicated replacement assistance for transit issues.
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Code / Category */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  CODE: {product.productCode}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1.5 ml-auto text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-950 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-emerald-950">
                  {formatINR(product.price)}
                </span>
                <span className="text-base text-stone-400 line-through">
                  {formatINR(product.mrp)}
                </span>
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-black border border-rose-200">
                    You Save {formatINR(product.mrp - product.price)} ({discountPercent}%)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of all taxes. Free shipping on orders over ₹999.
              </p>
            </div>

            {/* Specifications Key Table */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Pot Type</span>
                <span className="font-bold text-stone-800 mt-0.5 block">{product.potType}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Plant Size</span>
                <span className="font-bold text-stone-800 mt-0.5 block">{product.plantSize}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Pot Size</span>
                <span className="font-bold text-stone-800 mt-0.5 block">{product.potSize}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Stock Status</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{product.availability}</span>
              </div>
            </div>

            {/* Plant Care Details Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Horticulturist Care Guide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Light Requirement:</strong>
                    <span>{product.lightRequirement}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <Droplet className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Watering Schedule:</strong>
                    <span>{product.wateringRequirement}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-600 bg-white/60 p-3 rounded-xl border border-emerald-100">
                <strong>Plant Care Tip:</strong> {product.plantCare}
              </p>
            </div>

            {/* Quantity Selector & Main Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-100 text-stone-600 rounded-l-xl transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-100 text-stone-600 rounded-r-xl transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart + Buy Now + WhatsApp Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  potType={selectedPotType}
                  size="lg"
                  className="w-full text-sm"
                />
                <BuyNowButton
                  product={product}
                  quantity={quantity}
                  potType={selectedPotType}
                  size="lg"
                  className="w-full text-sm"
                />
              </div>

              <WhatsAppEnquiryButton
                product={product}
                quantity={quantity}
                selectedPot={selectedPotType}
                size="lg"
                variant="solid"
                className="w-full text-sm"
                label="Enquire / Order on WhatsApp"
              />
            </div>

            {/* Delivery Location / Pincode Checking */}
            <PincodeChecker />
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <ReviewSection
            productId={product.id}
            productName={product.name}
            rating={product.rating}
            reviewsCount={product.reviewsCount}
          />
        </div>

        {/* Related Products in Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950">Related Botanical Items</h3>
                <p className="text-xs text-stone-500">More options from the {product.categoryName} collection</p>
              </div>
              <Link href={`/products/${product.category}`} className="text-xs font-bold text-emerald-800 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Complementary Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950">You May Also Like</h3>
                <p className="text-xs text-stone-500">Pair your plant with artisanal pots and plant tonics</p>
              </div>
              <Link href="/products" className="text-xs font-bold text-emerald-800 hover:underline">
                Browse Shop →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
