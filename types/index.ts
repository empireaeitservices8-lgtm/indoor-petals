export interface Product {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  image: string;
  images?: string[];
  description: string;
  price: number;
  mrp: number;
  potType: string;
  plantSize: string;
  potSize: string;
  plantCare: string;
  wateringRequirement: string;
  lightRequirement: string;
  stock: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Available for Pre-Order';
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  popular?: boolean;
  isRental?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  image: string;
  benefits: string[];
  suitableFor: string[];
  whatsappMessage: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPotType?: string;
  selectedPlantSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
}

export interface OrderItem {
  productId: string;
  name: string;
  productCode: string;
  image: string;
  price: number;
  quantity: number;
  potType: string;
  plantSize: string;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery' | 'Razorpay';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: OrderStatus;
  estimatedDelivery: string;
  trackingUpdates?: {
    status: OrderStatus;
    time: string;
    note: string;
    completed: boolean;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  helpfulCount?: number;
  images?: string[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxDiscount?: number;
  expiryDate: string;
  description: string;
}

export interface DeliveryLocation {
  pincode: string;
  city: string;
  state: string;
  available: boolean;
  codAvailable: boolean;
  expressAvailable: boolean;
  estimatedDays: string;
  shippingCharge: number;
}
