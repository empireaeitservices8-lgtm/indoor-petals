'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product, Service } from '@/types';
import { getWhatsAppProductEnquiryUrl, getWhatsAppServiceEnquiryUrl, getWhatsAppGeneralHelpUrl } from '@/lib/whatsapp';

interface WhatsAppEnquiryButtonProps {
  product?: Product;
  service?: Service;
  quantity?: number;
  selectedPot?: string;
  customNote?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'floating';
  label?: string;
}

export const WhatsAppEnquiryButton: React.FC<WhatsAppEnquiryButtonProps> = ({
  product,
  service,
  quantity = 1,
  selectedPot,
  customNote,
  className = '',
  size = 'md',
  variant = 'outline',
  label,
}) => {
  let url = getWhatsAppGeneralHelpUrl();

  if (product) {
    url = getWhatsAppProductEnquiryUrl(product, quantity, selectedPot, customNote);
  } else if (service) {
    url = getWhatsAppServiceEnquiryUrl(service, customNote);
  }

  const defaultLabel = product
    ? 'WhatsApp Enquiry'
    : service
    ? 'Enquire on WhatsApp'
    : 'Chat with Us';

  const displayLabel = label || defaultLabel;

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-sm ${className}`}
        aria-label="WhatsApp customer support"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>
    );
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm font-semibold',
    lg: 'px-6 py-3.5 text-base font-bold',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ${
        variant === 'solid'
          ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow'
          : 'bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 hover:border-emerald-500'
      } ${sizeStyles[size]} ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-emerald-600 text-transparent" />
      <span>{displayLabel}</span>
    </a>
  );
};

export default WhatsAppEnquiryButton;
