'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import {
  CheckCircle2,
  Building2,
  PhoneCall,
  Sparkles,
  Calendar,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import WhatsAppEnquiryButton from '@/components/WhatsAppEnquiryButton';
import { useToast } from '@/context/ToastContext';

export default function ServicesPage() {
  const { showToast } = useToast();
  const [selectedService, setSelectedService] = useState(services[0].title);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide your name.', 'error');
      return;
    }
    if (phone.length !== 10) {
      showToast('Phone number must be exactly 10 digits.', 'error');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.endsWith('@gmail.com') || cleanEmail.startsWith('@')) {
      showToast('Email must be a valid @gmail.com address.', 'error');
      return;
    }
    if (!city.trim()) {
      showToast('Please provide your location or city.', 'error');
      return;
    }
    if (pincode.length !== 6) {
      showToast('Pincode must be exactly 6 digits.', 'error');
      return;
    }
    showToast(`Thank you ${name}! Our landscape horticulturist will contact you within 4 hours to confirm your site visit. 🌿`, 'success');
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
    setPincode('');
    setNotes('');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Services Hero */}
      <section className="bg-emerald-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-3.5 py-1 rounded-full border border-emerald-700">
            Certified Horticulture &amp; Landscaping
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4">
            Professional Plant &amp; Garden Services
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-4 leading-relaxed">
            From flexible corporate plant leasing and periodic garden maintenance to customized 3D landscape architecture and tabletop retail supplies.
          </p>
        </div>
      </section>

      {/* Detailed Services Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.slug}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-md`}
            >
              {/* Image (Compact & Contained) */}
              <div className="w-full lg:w-1/2 relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #064e3b, #047857)';
                    }
                  }}
                />
                <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-xs text-white px-3 py-1 rounded-xl text-xs font-mono font-bold">
                  0{index + 1} / Service
                </div>
              </div>

              {/* Text Info */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    INDOOR PETALS Solution
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                    Key Features &amp; Benefits:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suitable Clients */}
                <div className="pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800 mb-2">
                    <Building2 className="w-4 h-4 text-emerald-800" />
                    <span>Ideal For:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.suitableFor.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Service CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedService(service.title);
                      const el = document.getElementById('booking-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Request Consultation
                  </button>
                  <WhatsAppEnquiryButton
                    service={service}
                    size="md"
                    variant="solid"
                    label="WhatsApp Quick Quote"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Consultation Booking Form Section */}
      <section id="booking-form" className="py-16 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900 px-3.5 py-1 rounded-full border border-emerald-700">
              Site Inspection &amp; Quote
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3">
              Schedule A Horticulture Site Visit
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-2">
              Share your space requirements and our senior landscape consultant will visit your site or connect with a 3D plan.
            </p>
          </div>

          <form onSubmit={handleBooking} className="bg-white text-stone-900 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Selected Service *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold outline-none focus:border-emerald-600 bg-white"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sona Alexander"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Location / City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Kakkanad, Kochi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit pincode"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Space Description &amp; Requirements
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your space (balcony dimensions, office floor area, number of tables, or current garden condition)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              Submit Consultation Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
