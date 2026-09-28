'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '@/types';
import { CheckCircle2, ArrowRight, Building2 } from 'lucide-react';
import WhatsAppEnquiryButton from './WhatsAppEnquiryButton';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  return (
    <div
      className={`rounded-3xl bg-white border border-stone-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        featured ? 'ring-2 ring-emerald-600/20' : ''
      }`}
    >
      <div>
        {/* Service Photo (Compact & Contained) */}
        <div className="relative h-44 sm:h-48 md:h-52 w-full bg-stone-100 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              const parent = el.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #064e3b, #047857)';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-emerald-700/80 text-emerald-100 backdrop-blur-xs">
              Professional Service
            </span>
            <h3 className="text-lg font-black leading-tight mt-1 text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Key Benefits */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 mb-2.5">
              Service Highlights:
            </h4>
            <ul className="space-y-1.5">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-800" />
              <span>Recommended For:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {service.suitableFor.slice(0, 2).map((target, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-emerald-50/70 text-emerald-800 border border-emerald-100"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link
            href="/services"
            className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <WhatsAppEnquiryButton service={service} size="sm" variant="solid" className="w-full" label="Enquire on WhatsApp" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
