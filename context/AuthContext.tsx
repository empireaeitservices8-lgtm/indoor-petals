'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Order } from '@/types';

interface AuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<Customer>) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const DEMO_CUSTOMER: Customer = {
  id: 'cust-101',
  name: 'Sona Alexander',
  email: 'sona.alexander@example.com',
  phone: '+91 98470 12345',
  address: {
    street: 'Flat 4B, Green Haven Apartments, Civil Station Road',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682020',
    landmark: 'Opposite Infopark Phase 1',
  },
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-ip-98214',
    orderNumber: 'IP-2026-98214',
    date: '2026-09-24',
    customer: {
      name: 'Sona Alexander',
      email: 'sona.alexander@example.com',
      phone: '+91 98470 12345',
      shippingAddress: {
        street: 'Flat 4B, Green Haven Apartments, Civil Station Road',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682020',
      },
    },
    items: [
      {
        productId: 'prod-ind-1',
        name: 'Monstera Deliciosa (Swiss Cheese Plant)',
        productCode: 'IP-IND-101',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
        price: 899,
        quantity: 1,
        potType: 'Artisanal Ceramic Planter with Drainage Plate',
        plantSize: 'Medium (18 - 24 inches)',
      },
      {
        productId: 'prod-cer-1',
        name: 'Artisan Emerald Ripple Ceramic Planter with Saucer',
        productCode: 'IP-CER-601',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        price: 749,
        quantity: 1,
        potType: 'Glazed High-Fired Ceramic Stoneware',
        plantSize: 'Pot only',
      }
    ],
    subtotal: 1648,
    discount: 165,
    shipping: 0,
    tax: 0,
    total: 1483,
    couponCode: 'GREEN10',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Out for Delivery',
    estimatedDelivery: '2026-09-29',
    trackingUpdates: [
      { status: 'Order Placed', time: '2026-09-24 10:30 AM', note: 'Order successfully created & recorded', completed: true },
      { status: 'Payment Confirmed', time: '2026-09-24 10:32 AM', note: 'UPI payment verified via Razorpay', completed: true },
      { status: 'Processing', time: '2026-09-24 02:00 PM', note: 'Plants inspected by horticulturist', completed: true },
      { status: 'Packed', time: '2026-09-25 11:00 AM', note: 'Shock-proof botanical carton packaged', completed: true },
      { status: 'Shipped', time: '2026-09-26 09:15 AM', note: 'Dispatched via Express Plant Logistics', completed: true },
      { status: 'Out for Delivery', time: '2026-09-28 08:30 AM', note: 'With delivery executive in your area', completed: true },
      { status: 'Delivered', time: 'Estimated by 6:00 PM', note: 'Pending customer handoff', completed: false },
    ],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('indoorpetals_customer');
      if (savedUser) {
        setCustomer(JSON.parse(savedUser));
      } else {
        // Pre-fill demo user for rich preview experience
        setCustomer(DEMO_CUSTOMER);
      }
      const savedOrders = localStorage.getItem('indoorpetals_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error('Failed to load auth from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (customer) {
        localStorage.setItem('indoorpetals_customer', JSON.stringify(customer));
      } else {
        localStorage.removeItem('indoorpetals_customer');
      }
      localStorage.setItem('indoorpetals_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save auth to localStorage', e);
    }
  }, [customer, orders, isInitialized]);

  const login = async (email: string, password?: string) => {
    // Check registered users in localStorage
    try {
      const registeredRaw = localStorage.getItem('indoorpetals_registered_users');
      const registeredUsers: Array<{ email: string; password: string; name: string; phone: string }> =
        registeredRaw ? JSON.parse(registeredRaw) : [];

      const match = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (match) {
        const user: Customer = {
          id: `cust-${Date.now()}`,
          name: match.name,
          email: match.email,
          phone: match.phone,
          address: DEMO_CUSTOMER.address,
        };
        setCustomer(user);
        return { success: true, message: `Welcome back, ${user.name}!` };
      }
    } catch (e) {
      // localStorage unavailable
    }

    // Fallback: demo account check
    if (
      email.toLowerCase() === DEMO_CUSTOMER.email.toLowerCase() &&
      (password === 'password123' || !password)
    ) {
      const user: Customer = {
        id: 'cust-101',
        name: DEMO_CUSTOMER.name,
        email: DEMO_CUSTOMER.email,
        phone: DEMO_CUSTOMER.phone,
        address: DEMO_CUSTOMER.address,
      };
      setCustomer(user);
      return { success: true, message: `Welcome back, ${user.name}!` };
    }

    throw new Error('Invalid email or password. Please check your credentials and try again.');
  };

  const signup = async (name: string, email: string, phone: string, password?: string) => {
    // Check for duplicate phone
    try {
      const registeredRaw = localStorage.getItem('indoorpetals_registered_users');
      const registeredUsers: Array<{ email: string; password: string; name: string; phone: string }> =
        registeredRaw ? JSON.parse(registeredRaw) : [];

      const phoneExists = registeredUsers.some((u) => u.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
      if (phoneExists) {
        throw new Error('This phone number is already registered. Please sign in instead.');
      }

      const emailExists = registeredUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }

      // Save to registered users
      registeredUsers.push({ name, email, phone, password: password || '' });
      localStorage.setItem('indoorpetals_registered_users', JSON.stringify(registeredUsers));
    } catch (e: any) {
      if (e.message && (e.message.includes('already registered') || e.message.includes('already exists'))) {
        throw e;
      }
      // localStorage unavailable — continue
    }

    const user: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      address: {
        street: 'Main Street',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682001',
      },
    };
    setCustomer(user);
    return { success: true, message: `Account created successfully! Welcome to INDOOR PETALS, ${name}.` };
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('indoorpetals_customer');
  };

  const updateProfile = (updatedData: Partial<Customer>) => {
    if (!customer) return;
    setCustomer({ ...customer, ...updatedData });
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        login,
        signup,
        logout,
        updateProfile,
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
