'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { getWhatsAppGeneralHelpUrl } from '@/lib/whatsapp';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Product Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Thank you for contacting INDOOR PETALS! Our plant team will respond within 24 hours.', 'success');
  };

  const whatsAppUrl = getWhatsAppGeneralHelpUrl();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-3.5 py-1 rounded-full border border-emerald-700">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Contact INDOOR PETALS</h1>
          <p className="text-xs sm:text-base text-emerald-200">
            Have a question about plant care, commercial landscaping, or custom bulk orders? We are here to assist!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Contact Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-emerald-950">Our Botanical Branches &amp; Contact</h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                {/* Location 1 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-emerald-950 font-black text-xs uppercase tracking-wider">Business Location 1:</strong>
                    <span className="font-bold text-stone-900 text-sm">Peyad, Thachottukavu</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Showroom, Nursery &amp; Plant Care Hub</p>
                  </div>
                </div>

                {/* Location 2 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-emerald-950 font-black text-xs uppercase tracking-wider">Business Location 2:</strong>
                    <span className="font-bold text-stone-900 text-sm">Kazhakootam, Karyavattom - Chenkottukonam</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">Garden Design &amp; Landscaping Services Office</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold">Direct Phone Helpline:</strong>
                    <div className="flex flex-wrap gap-2 mt-0.5">
                      <a href="tel:9946718868" className="text-emerald-800 font-black hover:underline">9946718868</a>
                      <span className="text-stone-300">•</span>
                      <a href="tel:9645718868" className="text-emerald-800 font-black hover:underline">9645718868</a>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold">Official Email:</strong>
                    <a href="mailto:indoorpetals@gmail.com" className="text-emerald-800 font-bold hover:underline">
                      indoorpetals@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold">Operating Hours:</strong>
                    <span>Monday – Saturday: 9:00 AM – 7:30 PM (Sunday: 10:00 AM – 5:00 PM)</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Chat Trigger */}
              <div className="pt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>WhatsApp: 9946718868</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-emerald-950">Message Received!</h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you for reaching out to INDOOR PETALS. One of our plant specialists will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-950 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-black text-emerald-950 mb-4">Send Us A Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sona Alexander"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600"
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
                      placeholder="sona@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600 bg-white"
                    >
                      <option>General Product Enquiry</option>
                      <option>Plant Rental Service</option>
                      <option>Landscaping Site Visit</option>
                      <option>Garden Maintenance Subscription</option>
                      <option>Bulk Tabletop Order for Shops</option>
                      <option>Order &amp; Shipping Status</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the plants you are looking for or the space you'd like to green..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to INDOOR PETALS</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
