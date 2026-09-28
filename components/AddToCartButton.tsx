'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  potType?: string;
  plantSize?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'compact';
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  potType,
  plantSize,
  className = '',
  size = 'md',
  variant = 'primary',
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.availability === 'Out of Stock') {
      showToast(`Sorry, "${product.name}" is currently out of stock.`, 'error');
      return;
    }

    addToCart(product, quantity, potType, plantSize);
    setIsAdded(true);
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart! 🪴`, 'success');

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const isOutOfStock = product.availability === 'Out of Stock';

  const sizeStyles = {
    sm: 'px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs',
    md: 'px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold',
    lg: 'px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-bold',
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleAdd}
        disabled={isOutOfStock}
        className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
          isOutOfStock
            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
            : isAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-sm hover:shadow active:scale-95'
        } ${className}`}
        title="Add to cart"
      >
        {isAdded ? <Check className="w-4 h-4 shrink-0" /> : <ShoppingBag className="w-4 h-4 shrink-0" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isOutOfStock}
      className={`inline-flex items-center justify-center gap-1 sm:gap-2 rounded-xl transition-all duration-200 shadow-sm ${
        isOutOfStock
          ? 'bg-stone-200 text-stone-400 cursor-not-allowed border-stone-200'
          : variant === 'outline'
          ? 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-800/30 hover:border-emerald-800'
          : isAdded
          ? 'bg-emerald-600 text-white'
          : 'bg-emerald-900 hover:bg-emerald-800 text-white hover:shadow-md active:scale-[0.98]'
      } ${sizeStyles[size]} ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Added</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
