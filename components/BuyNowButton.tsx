'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface BuyNowButtonProps {
  product: Product;
  quantity?: number;
  potType?: string;
  plantSize?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({
  product,
  quantity = 1,
  potType,
  plantSize,
  className = '',
  size = 'md',
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.availability === 'Out of Stock') return;

    addToCart(product, quantity, potType, plantSize);
    router.push('/checkout');
  };

  const isOutOfStock = product.availability === 'Out of Stock';

  const sizeStyles = {
    sm: 'px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold',
    md: 'px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold',
    lg: 'px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-bold',
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={isOutOfStock}
      className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] ${
        isOutOfStock ? 'bg-stone-300 text-stone-500 cursor-not-allowed' : ''
      } ${sizeStyles[size]} ${className}`}
    >
      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-200 text-amber-200 shrink-0" />
      <span className="truncate">Buy Now</span>
    </button>
  );
};

export default BuyNowButton;
