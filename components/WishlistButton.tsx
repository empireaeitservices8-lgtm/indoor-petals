'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { Product } from '@/types';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      showToast(`Added "${product.name}" to your wishlist! 💚`, 'success');
    } else {
      showToast(`Removed "${product.name}" from your wishlist.`, 'info');
    }
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ${
        isFavorited
          ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
          : 'bg-white/90 text-stone-600 hover:text-rose-500 hover:bg-white border border-stone-200/80 shadow-sm'
      } ${size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2.5'} ${className}`}
      title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label="Wishlist toggle"
    >
      <Heart
        className={`${iconSizes[size]} transition-transform active:scale-125 ${
          isFavorited ? 'fill-rose-500 text-rose-500' : ''
        }`}
      />
      {showLabel && (
        <span className="text-sm font-semibold">
          {isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;
