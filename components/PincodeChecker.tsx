'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, XCircle, Truck, Clock } from 'lucide-react';
import { checkPincodeServiceability } from '@/data/pincodes';
import { DeliveryLocation } from '@/types';

interface PincodeCheckerProps {
  className?: string;
  onPincodeVerified?: (loc: DeliveryLocation) => void;
}

export const PincodeChecker: React.FC<PincodeCheckerProps> = ({
  className = '',
  onPincodeVerified,
}) => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<DeliveryLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6) return;

    setLoading(true);
    setTimeout(() => {
      const res = checkPincodeServiceability(pincode);
      setResult(res);
      setLoading(false);
      if (onPincodeVerified && res.available) {
        onPincodeVerified(res);
      }
    }, 300);
  };

  return (
    <div className={`p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 ${className}`}>
      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
        <MapPin className="w-4 h-4 text-emerald-700" />
        <span>Check Delivery Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          pattern="[0-9]*"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (result) setResult(null);
          }}
          placeholder="Enter 6-digit Pincode (e.g. 682020)"
          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-xs font-medium outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-300 text-white text-xs font-bold transition-colors shadow-xs"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && (
        <div className="mt-3 pt-3 border-t border-emerald-200/60 animate-fade-in">
          {result.available ? (
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Delivery available to {result.city}, {result.state} ({result.pincode})</span>
              </div>
              <div className="flex items-center gap-4 text-stone-600 pl-5 text-[11px]">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-emerald-700" />
                  Estimated: {result.estimatedDays}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Truck className="w-3 h-3 text-emerald-700" />
                  {result.shippingCharge === 0 ? 'Free Shipping' : `₹${result.shippingCharge} Shipping`}
                </span>
                {result.codAvailable && (
                  <span className="text-emerald-700 font-semibold">● Cash on Delivery Available</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Sorry, delivery is currently unavailable for pincode {result.pincode}. Contact us via WhatsApp for custom orders.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;
