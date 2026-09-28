'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Check,
} from 'lucide-react';
import OrderTracker from '@/components/OrderTracker';

export default function AccountPage() {
  const router = useRouter();
  const { customer, isAuthenticated, logout, updateProfile, orders } = useAuth();
  const { totalWishlistItems } = useWishlist();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customer?.name || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [street, setStreet] = useState(customer?.address?.street || '');
  const [city, setCity] = useState(customer?.address?.city || '');
  const [pincode, setPincode] = useState(customer?.address?.pincode || '');

  if (!isAuthenticated || !customer) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Please Sign In</h2>
        <p className="text-stone-500 text-xs sm:text-sm">
          You must be signed in to view your customer profile, order history, and saved addresses.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-xl bg-emerald-950 text-white font-bold text-xs sm:text-sm shadow-md"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      address: {
        street,
        city,
        state: customer.address?.state || 'Kerala',
        pincode,
      },
    });
    setIsEditing(false);
    showToast('Customer profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.', 'info');
    router.push('/');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-emerald-200 text-2xl font-black flex items-center justify-center border border-emerald-600 shadow-md">
              {customer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">{customer.name}</h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold border border-emerald-700">
                  Green Club Member
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">{customer.email} • {customer.phone}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-stone-200 hover:text-white text-xs font-bold border border-emerald-700/60 self-start sm:self-auto transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Account Dashboard Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Nav Summary Cards */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/account/orders"
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black text-stone-900">{orders.length}</span>
                  <p className="text-xs font-bold text-stone-500">My Orders</p>
                </div>
              </Link>

              <Link
                href="/wishlist"
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-rose-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-black text-stone-900">{totalWishlistItems}</span>
                  <p className="text-xs font-bold text-stone-500">Wishlist Items</p>
                </div>
              </Link>
            </div>

            {/* Saved Delivery Information */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Saved Delivery Address</span>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-emerald-700 hover:underline font-bold"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 rounded-lg border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2 rounded-lg border border-stone-300"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-900 text-white font-bold rounded-lg mt-2"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="text-xs text-stone-600 space-y-1">
                  <p className="font-bold text-stone-900">{customer.name}</p>
                  <p>{customer.address?.street}</p>
                  <p>{customer.address?.city}, {customer.address?.state} - {customer.address?.pincode}</p>
                  <p className="text-stone-500 pt-1">Phone: {customer.phone}</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
              <Link
                href="/account/orders"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 font-bold transition-colors"
              >
                <span>View Order History</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/order-tracking"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 font-bold transition-colors"
              >
                <span>Track Active Delivery</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 font-bold transition-colors"
              >
                <span>Book Garden Service</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            </div>
          </div>

          {/* Right Content: Active Orders & Tracker */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-emerald-950">Active Orders &amp; Live Tracking</h2>
                <Link href="/account/orders" className="text-xs font-bold text-emerald-700 hover:underline">
                  All Orders ({orders.length}) →
                </Link>
              </div>

              {/* Render Order Tracker with user orders */}
              <OrderTracker initialOrder={orders[0]} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
