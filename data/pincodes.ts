import { DeliveryLocation } from '@/types';

export const serviceablePincodes: Record<string, DeliveryLocation> = {
  // Major Metro & Tier 1/2 samples
  '682001': { pincode: '682001', city: 'Kochi', state: 'Kerala', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '1-2 business days', shippingCharge: 0 },
  '682020': { pincode: '682020', city: 'Kakkanad, Kochi', state: 'Kerala', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '1-2 business days', shippingCharge: 0 },
  '695001': { pincode: '695001', city: 'Thiruvananthapuram', state: 'Kerala', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '2-3 business days', shippingCharge: 0 },
  '673001': { pincode: '673001', city: 'Kozhikode', state: 'Kerala', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '2-3 business days', shippingCharge: 0 },
  '560001': { pincode: '560001', city: 'Bengaluru', state: 'Karnataka', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '2-3 business days', shippingCharge: 49 },
  '600001': { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '2-4 business days', shippingCharge: 49 },
  '400001': { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '3-4 business days', shippingCharge: 79 },
  '110001': { pincode: '110001', city: 'New Delhi', state: 'Delhi', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '3-5 business days', shippingCharge: 79 },
  '500001': { pincode: '500001', city: 'Hyderabad', state: 'Telangana', available: true, codAvailable: true, expressAvailable: true, estimatedDays: '3-4 business days', shippingCharge: 59 },
  '700001': { pincode: '700001', city: 'Kolkata', state: 'West Bengal', available: true, codAvailable: false, expressAvailable: false, estimatedDays: '4-6 business days', shippingCharge: 99 },
};

export function checkPincodeServiceability(pincode: string): DeliveryLocation {
  const cleaned = pincode.trim();
  if (serviceablePincodes[cleaned]) {
    return serviceablePincodes[cleaned];
  }
  
  // Rule-based algorithm for all valid 6-digit Indian pincodes
  if (/^[1-9][0-9]{5}$/.test(cleaned)) {
    const isKerala = cleaned.startsWith('67') || cleaned.startsWith('68') || cleaned.startsWith('69');
    const isSouthIndia = cleaned.startsWith('5') || cleaned.startsWith('6');
    
    return {
      pincode: cleaned,
      city: isKerala ? 'Kerala Region' : isSouthIndia ? 'South Zone Delivery' : 'Standard Delivery Zone',
      state: isKerala ? 'Kerala' : 'India',
      available: true,
      codAvailable: isKerala || isSouthIndia,
      expressAvailable: isKerala,
      estimatedDays: isKerala ? '2-3 business days' : isSouthIndia ? '3-5 business days' : '4-7 business days',
      shippingCharge: isKerala ? 0 : 79,
    };
  }

  return {
    pincode: cleaned,
    city: 'Unknown',
    state: 'Unknown',
    available: false,
    codAvailable: false,
    expressAvailable: false,
    estimatedDays: 'N/A',
    shippingCharge: 0,
  };
}
