import { Coupon } from '@/types';

export const validCoupons: Coupon[] = [
  {
    code: 'GREEN10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 499,
    maxDiscount: 300,
    expiryDate: '2026-12-31',
    description: 'Get 10% off on your order over ₹499 (Max ₹300)',
  },
  {
    code: 'PETALS20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 1499,
    maxDiscount: 800,
    expiryDate: '2026-12-31',
    description: 'Enjoy 20% off on cart values above ₹1,499 (Max ₹800)',
  },
  {
    code: 'WELCOME500',
    discountType: 'fixed',
    discountValue: 500,
    minSpend: 2499,
    expiryDate: '2026-12-31',
    description: 'Flat ₹500 off on large orders over ₹2,499',
  },
  {
    code: 'NATURE15',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 999,
    maxDiscount: 500,
    expiryDate: '2026-12-31',
    description: 'Special 15% discount on plants & planters over ₹999',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 99,
    minSpend: 399,
    expiryDate: '2026-12-31',
    description: 'Free standard shipping discount on orders over ₹399',
  },
];
