'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/utils';
import { checkPincodeServiceability } from '@/data/pincodes';
import { Order, OrderItem } from '@/types';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Tag,
  MapPin,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, appliedCoupon, shippingCharge, finalTotal, clearCart } = useCart();
  const { customer, addOrder } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [fullName, setFullName] = useState(customer?.name || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [streetAddress, setStreetAddress] = useState(customer?.address?.street || '');
  const [city, setCity] = useState(customer?.address?.city || 'Kochi');
  const [state, setState] = useState(customer?.address?.state || 'Kerala');
  const [pincode, setPincode] = useState(customer?.address?.pincode || '682020');

  // Payment Options: UPI, Debit/Credit Card, Net Banking, Cash on Delivery
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  // Delivery check state
  const pincodeCheck = checkPincodeServiceability(pincode);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Your bag is empty</h2>
        <p className="text-stone-500 mt-2">Add items to your shopping cart before checking out.</p>
        <Link
          href="/products"
          className="mt-4 inline-block px-6 py-3 rounded-2xl bg-emerald-950 text-white font-bold text-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // Handle Razorpay Payment Flow
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !streetAddress.trim() || !pincode.trim()) {
      showToast('Please fill in all required shipping details.', 'error');
      return;
    }

    if (!pincodeCheck.available) {
      showToast('Please enter a serviceable 6-digit delivery pincode.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Call server-side API route /api/payments/create to generate order securely
      const createRes = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customerName: fullName,
            customerEmail: email,
            customerPhone: phone,
            pincode,
          },
        }),
      });

      const orderData = await createRes.json();

      // Step 2: Server-side payment verification simulated / Razorpay SDK verification
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderData.orderId || `order_${Date.now()}`,
          razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          razorpay_signature: `mock_sig_${Date.now()}`,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.verified && paymentMethod !== 'Cash on Delivery') {
        throw new Error('Payment verification failed on server.');
      }

      // Step 3: Create confirmed order record
      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        productCode: item.product.productCode,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        potType: item.selectedPotType || item.product.potType,
        plantSize: item.selectedPlantSize || item.product.plantSize,
      }));

      const newOrderNumber = `IP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNumber,
        date: new Date().toISOString().split('T')[0],
        customer: {
          name: fullName,
          email,
          phone,
          shippingAddress: {
            street: streetAddress,
            city,
            state,
            pincode,
          },
        },
        items: orderItems,
        subtotal,
        discount,
        shipping: shippingCharge,
        tax: 0,
        total: finalTotal,
        couponCode: appliedCoupon?.code,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'Payment Confirmed',
        estimatedDelivery: pincodeCheck.estimatedDays,
        trackingUpdates: [
          { status: 'Order Placed', time: 'Just now', note: 'Order successfully created', completed: true },
          { status: 'Payment Confirmed', time: 'Just now', note: `Payment received via ${paymentMethod}`, completed: true },
          { status: 'Processing', time: 'Scheduled today', note: 'Allocated to greenhouse team', completed: false },
          { status: 'Packed', time: 'Pending', note: 'Shock-proof honeycomb boxing', completed: false },
          { status: 'Shipped', time: 'Pending', note: 'Dispatch with tracking number', completed: false },
          { status: 'Out for Delivery', time: 'Pending', note: 'Local courier agent', completed: false },
          { status: 'Delivered', time: 'Pending', note: 'Handed over to customer', completed: false },
        ],
      };

      addOrder(newOrder);
      setOrderSuccess(newOrder);
      clearCart();
      showToast('Order placed successfully! Confirmation sent to your email. 🪴', 'success');
    } catch (err: any) {
      console.error('Checkout error:', err);
      showToast(err.message || 'Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // SUCCESS VIEW
  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed &amp; Paid
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-emerald-950 mt-3">
              Thank You for Your Order, {orderSuccess.customer.name}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Order ID: <strong className="text-emerald-900 font-mono">{orderSuccess.orderNumber}</strong> • Receipt sent to {orderSuccess.customer.email}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 text-left space-y-4 max-w-xl mx-auto text-xs sm:text-sm">
            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="font-bold text-stone-900 text-right">
                {orderSuccess.customer.shippingAddress.street}, {orderSuccess.customer.shippingAddress.city}, {orderSuccess.customer.shippingAddress.pincode}
              </span>
            </div>

            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">{orderSuccess.estimatedDelivery}</span>
            </div>

            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500">Payment Mode:</span>
              <span className="font-bold text-stone-900">{orderSuccess.paymentMethod} (Razorpay Verified)</span>
            </div>

            <div className="flex justify-between text-base font-black text-emerald-950 pt-1">
              <span>Total Amount Paid:</span>
              <span className="text-emerald-900">{formatINR(orderSuccess.total)}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              href="/order-tracking"
              className="px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Track Order Live
            </Link>
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black">Secure Checkout</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold bg-emerald-900 px-3 py-1.5 rounded-full border border-emerald-700">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>
      </section>

      {/* Main Checkout Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Customer Details, Address, Pincode & Payment Mode */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-black text-stone-900">Customer Contact Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sona Alexander"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number (for Delivery Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98470 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address (for Order Receipt &amp; Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sona@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address & Pincode Checking */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-black text-stone-900">Delivery Address &amp; Pincode</h2>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Street Address / House Name / Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Flat 4B, Green Haven Apartments, Civil Station Road"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    6-Digit Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="682020"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kochi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Kerala"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              {/* Delivery Availability Confirmation Alert */}
              <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                pincodeCheck.available
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {pincodeCheck.available ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Delivery available to <strong>{pincodeCheck.city}, {pincodeCheck.state}</strong> (Estimated: {pincodeCheck.estimatedDays})
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Please enter a valid 6-digit delivery pincode to confirm coverage.</span>
                  </>
                )}
              </div>
            </div>

            {/* 3. Payment Method (Razorpay Options) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-black text-stone-900">Choose Payment Method</h2>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'UPI',
                    title: 'UPI (Google Pay, PhonePe, Paytm, BHIM)',
                    desc: 'Fastest & zero transaction charges via Razorpay UPI gateway',
                    icon: '📱',
                  },
                  {
                    id: 'Card',
                    title: 'Credit / Debit Card (Visa, Mastercard, RuPay)',
                    desc: 'Instant secure payment via Razorpay 256-bit encrypted checkout',
                    icon: '💳',
                  },
                  {
                    id: 'Net Banking',
                    title: 'Net Banking (All Indian Banks)',
                    desc: 'HDFC, SBI, ICICI, Axis, Federal Bank and 50+ banks supported',
                    icon: '🏦',
                  },
                  {
                    id: 'Cash on Delivery',
                    title: 'Cash on Delivery (COD)',
                    desc: 'Pay cash or scan QR when delivery executive arrives',
                    icon: '💵',
                  },
                ].map((mode) => (
                  <label
                    key={mode.id}
                    onClick={() => setPaymentMethod(mode.id as any)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === mode.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/30'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === mode.id}
                      onChange={() => setPaymentMethod(mode.id as any)}
                      className="accent-emerald-800 w-4 h-4 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900">
                        <span>{mode.icon}</span>
                        <span>{mode.title}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{mode.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar & Place Order CTA */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-md space-y-5 sticky top-28">
            <h2 className="text-base font-extrabold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Order Summary ({cart.length} items)
            </h2>

            {/* Item list in sidebar */}
            <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.product.categoryName)}&background=d1fae5&color=047857&size=60&bold=true`;
                      }}
                    />
                    <div className="truncate max-w-[170px]">
                      <h4 className="font-bold text-stone-900 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">{formatINR(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingCharge === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-stone-900'}>
                  {shippingCharge === 0 ? 'FREE' : formatINR(shippingCharge)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-emerald-950 pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-xl text-emerald-900">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="pt-3 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-emerald-950 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                {isProcessing ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatINR(finalTotal)} via {paymentMethod}</span>
                  </>
                )}
              </button>

              <div className="p-3 rounded-xl bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200/80 flex items-center gap-2 text-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Protected by Razorpay Payment Guarantee &amp; Transit Warranty</span>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
