'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { categories } from '@/data/categories';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ShieldCheck,
  CreditCard,
  Truck,
  HeartHandshake,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppGeneralHelpUrl } from '@/lib/whatsapp';

export const Footer: React.FC = () => {
  const whatsAppUrl = getWhatsAppGeneralHelpUrl();

  return (
    <footer className="bg-emerald-950 text-stone-300 pt-16 pb-12 border-t border-emerald-900/60 overflow-hidden">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-emerald-900/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Safe Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">Shock-proof plant packaging guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Transit Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">Prompt assistance &amp; replacement care</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Plant Care Guidance</h4>
              <p className="text-xs text-stone-400 mt-0.5">Direct WhatsApp horticulture guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Razorpay Checkout</h4>
              <p className="text-xs text-stone-400 mt-0.5">UPI, Cards, Net Banking &amp; COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" />
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              INDOOR PETALS is your premier destination for acclimatized indoor plants, artisanal ceramic planters, slow-release fertilizers, flexible corporate plant rentals, and turnkey landscaping services.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 block font-bold">Branch 1:</strong>
                  <span>Peyad, Thachottukavu</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 block font-bold">Branch 2:</strong>
                  <span>Kazhakootam, Karyavattom - Chenkottukonam</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <a href="tel:9946718868" className="hover:text-white font-medium underline-offset-2 hover:underline">9946718868</a>
                  <span>/</span>
                  <a href="tel:9645718868" className="hover:text-white font-medium underline-offset-2 hover:underline">9645718868</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:indoorpetals@gmail.com" className="hover:text-white underline-offset-2 hover:underline">
                  indoorpetals@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com/indoorpetals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-[#25D366] text-stone-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-300 transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-300 transition-colors">Gardening &amp; Plant Services</Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-emerald-300 transition-colors">Order Tracking</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-emerald-300 transition-colors">Customer Account</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories (All 15 Categories) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Plant Categories
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(0, 9).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-emerald-400 font-bold hover:underline">
                  + View all {categories.length} Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/policies/shipping-delivery" className="hover:text-emerald-300 transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="hover:text-emerald-300 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/plant-replacement" className="hover:text-emerald-300 transition-colors">
                  Plant Replacement Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-emerald-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <h5 className="text-[11px] font-bold text-stone-300 uppercase tracking-wider mb-2">Accepted Payment Modes:</h5>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-emerald-200">
                <span className="px-2 py-1 rounded bg-emerald-900/80 border border-emerald-800">UPI (GPay/PhonePe)</span>
                <span className="px-2 py-1 rounded bg-emerald-900/80 border border-emerald-800">Cards</span>
                <span className="px-2 py-1 rounded bg-emerald-900/80 border border-emerald-800">Net Banking</span>
                <span className="px-2 py-1 rounded bg-emerald-900/80 border border-emerald-800">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} INDOOR PETALS. All rights reserved. Indoor Plants &amp; Gardening Solutions.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <Link href="/policies/privacy" className="hover:text-emerald-400">Privacy Policy</Link>
          <span>•</span>
          <Link href="/policies/shipping-delivery" className="hover:text-emerald-400">Shipping Terms</Link>
          <span>•</span>
          <Link href="/policies/plant-replacement" className="hover:text-emerald-400">Plant Replacement</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
