'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast('Password reset link sent to your registered email address.', 'success');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-12 bg-[#faf8f5]">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-2xl max-w-md w-full space-y-6 text-center">
        <Logo className="justify-center" />

        {submitted ? (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-emerald-950">Check Your Email</h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              We have sent a password reset link to <strong>{email}</strong>. Please check your spam folder if you do not see it within a minute.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-black text-emerald-950 mt-2">Reset Password</h1>
              <p className="text-xs text-stone-500 mt-1">
                Enter your registered email address and we will send instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Send Password Reset Link
              </button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-emerald-800 font-bold hover:underline">
                  ← Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
