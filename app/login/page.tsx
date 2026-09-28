'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Logo } from '@/components/Logo';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validateEmail = (val: string) => {
    if (!val) return 'Email address is required.';
    if (!val.endsWith('@gmail.com')) return 'Email must end with @gmail.com';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await login(email, password);
      showToast(res.message, 'success');
      router.push('/account');
    } catch (e: any) {
      const msg = e.message || 'Invalid email or password. Please try again.';
      setErrors({ general: msg });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-[#faf8f5]">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Logo className="justify-center" />
          <h1 className="text-2xl font-black text-emerald-950 mt-4">Welcome Back</h1>
          <p className="text-xs text-stone-500">Sign in to your INDOOR PETALS plant parent account</p>
        </div>

        {/* General Error Banner */}
        {errors.general && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.email ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
                placeholder="yourname@gmail.com"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                  errors.email
                    ? 'border-rose-400 bg-rose-50 focus:border-rose-500'
                    : 'border-stone-200 focus:border-emerald-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-emerald-700 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.password ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) }))}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                  errors.password
                    ? 'border-rose-400 bg-rose-50 focus:border-rose-500'
                    : 'border-stone-200 focus:border-emerald-600'
                }`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{loading ? 'Signing In...' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-500">
          Do not have an account yet?{' '}
          <Link href="/signup" className="text-emerald-800 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
