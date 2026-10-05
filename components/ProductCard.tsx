'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Zap, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { formatINR, calculateDiscount } from '@/lib/utils';
import WishlistButton from './WishlistButton';
import AddToCartButton from './AddToCartButton';
import BuyNowButton from './BuyNowButton';
import { getWhatsAppProductEnquiryUrl } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
  showViewDetails?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  viewMode = 'grid',
  showViewDetails = false,
}) => {
  const discountPercent = calculateDiscount(product.price, product.mrp);
  const whatsAppUrl = getWhatsAppProductEnquiryUrl(product);

  if (viewMode === 'list') {
    return (
      <div className={`flex flex-col sm:flex-row gap-4 p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-500/40 hover:shadow-md transition-all duration-200 group ${className}`}>
        {/* Compact Image */}
        <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-white p-2 shrink-0 flex items-center justify-center">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.categoryName)}&background=d1fae5&color=047857&size=200&bold=true`;
              }}
            />
          </Link>
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase">
              {discountPercent}% OFF
            </span>
          )}
          <div className="absolute top-2 right-2">
            <WishlistButton product={product} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                Product Code: {product.productCode}
              </span>
              <span className="text-xs font-semibold text-emerald-700 truncate">{product.categoryName}</span>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal text-[11px]">({product.reviewsCount})</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2.5 text-[11px] text-stone-600">
              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
                🪴 {product.potType}
              </span>
              <span className="bg-stone-50 text-stone-700 px-2 py-0.5 rounded-md font-medium border border-stone-100">
                📏 {product.plantSize}
              </span>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-emerald-950">{formatINR(product.price)}</span>
                <span className="text-xs text-stone-400 line-through">{formatINR(product.mrp)}</span>
              </div>
              <span className="text-[10.5px] font-semibold text-emerald-700">● {product.availability}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#25D366] border border-emerald-200 transition-colors"
                title="Enquire on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <AddToCartButton product={product} size="sm" variant="outline" className="text-xs py-2 px-3" />
              <BuyNowButton product={product} size="sm" className="text-xs py-2 px-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Compact Grid Card
  return (
    <div className={`flex flex-col h-full rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 group overflow-hidden ${className}`}>
      {/* Compact Responsive Image Area (Fixed Aspect Ratio - No Cropping) */}
      <div className="relative aspect-[4/3] w-full bg-white overflow-hidden flex items-center justify-center p-3 shrink-0">
        <Link href={`/product/${product.slug}`} className="block w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.categoryName)}&background=d1fae5&color=047857&size=200&bold=true`;
            }}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9.5px] font-black uppercase tracking-wider shadow-2xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-900 text-emerald-100 text-[9px] font-bold uppercase tracking-wider shadow-2xs">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton product={product} size="sm" />
        </div>

        {/* Minimal Bottom Availability Tag */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-stone-700 border border-stone-100 shadow-2xs pointer-events-none">
          <span className="truncate font-medium">{product.potType}</span>
          <span className="text-emerald-700 font-bold shrink-0 ml-1">● {product.availability}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Code & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5 text-xs">
            <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 truncate max-w-[170px]">
              Product Code: {product.productCode}
            </span>
            <div className="flex items-center gap-1 font-bold text-amber-500 text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title - Fixed Min Height for Perfect Grid Alignment */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-stone-900 text-xs sm:text-sm leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[2.5rem] flex items-center">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Buttons */}
        <div className="pt-2.5 mt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="text-base sm:text-lg font-black text-emerald-950">{formatINR(product.price)}</span>
              <span className="text-xs text-stone-400 line-through">{formatINR(product.mrp)}</span>
            </div>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
                Save {formatINR(product.mrp - product.price)}
              </span>
            )}
          </div>

          {showViewDetails ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/product/${product.slug}`}
                  className="h-9 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition-colors flex items-center justify-center border border-stone-200 text-center"
                >
                  View Details
                </Link>
                <AddToCartButton product={product} size="sm" variant="outline" className="h-9 w-full text-xs font-bold py-0" />
              </div>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200 transition-colors w-full"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366] shrink-0" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          ) : (
            <>
              {/* Action Row */}
              <div className="grid grid-cols-2 gap-2">
                <AddToCartButton product={product} size="sm" variant="outline" className="h-9 w-full text-xs font-bold py-0" />
                <BuyNowButton product={product} size="sm" className="h-9 w-full text-xs font-bold py-0" />
              </div>

              {/* Compact WhatsApp Link */}
              <div className="mt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200 transition-colors w-full"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366] shrink-0" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
