'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Logo } from '@/components/Logo';
import { Lock, Mail, User, Phone, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  /* ── Validators ── */
  const validateName = (v: string) => (!v.trim() ? 'Full name is required.' : '');

  const validateEmail = (v: string) => {
    if (!v) return 'Email address is required.';
    if (!v.endsWith('@gmail.com')) return 'Email must end with @gmail.com';
    return '';
  };

  const validatePhone = (v: string) => {
    if (!v) return 'Phone number is required.';
    const digits = v.replace(/\D/g, '');
    if (digits.length !== 10) return 'Phone number must be exactly 10 digits.';
    return '';
  };

  const validatePassword = (v: string) => {
    if (!v) return 'Password is required.';
    if (v.length < 6) return 'Password must be at least 6 characters.';
    // Prevent pure-number passwords like "1234561234"
    if (/^\d+$/.test(v)) return 'Password cannot be only numbers. Add letters too.';
    return '';
  };

  const validateConfirmPassword = (v: string) => {
    if (!v) return 'Please confirm your password.';
    if (v !== password) return 'Passwords do not match.';
    return '';
  };

  /* ── Phone input: allow only digits, max 10 ── */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digits);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await signup(name, email, phone, password);
      showToast(res.message, 'success');
      router.push('/account');
    } catch (e: any) {
      const msg: string = e.message || 'Registration failed. Please try again.';
      // Check if number already registered
      if (msg.toLowerCase().includes('phone') || msg.toLowerCase().includes('number') || msg.toLowerCase().includes('registered')) {
        setErrors({
          phone: 'This phone number is already registered. Please sign in instead.',
          general: 'This phone number is already registered.',
        });
      } else {
        setErrors({ general: msg });
      }
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  /* ── Password strength helper ── */
  const getPasswordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Too short', color: 'bg-rose-500', width: 'w-1/4' };
    if (/^\d+$/.test(password)) return { label: 'Too weak (numbers only)', color: 'bg-orange-500', width: 'w-1/4' };
    if (password.length < 8) return { label: 'Weak', color: 'bg-amber-400', width: 'w-2/4' };
    if (password.length >= 10 && /[^a-zA-Z0-9]/.test(password)) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    return { label: 'Moderate', color: 'bg-emerald-400', width: 'w-3/4' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-[#faf8f5]">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-2xl max-w-md w-full space-y-5">
        <div className="text-center space-y-2">
          <Logo className="justify-center" />
          <h1 className="text-2xl font-black text-emerald-950 mt-4">Create Account</h1>
          <p className="text-xs text-stone-500">Join the INDOOR PETALS community for member perks &amp; discounts</p>
        </div>

        {/* General Error / Already registered banner */}
        {errors.general && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <div>
              <span>{errors.general}</span>
              {errors.phone && errors.phone.includes('already registered') && (
                <span className="block mt-1">
                  <Link href="/login" className="underline font-bold text-rose-700 hover:text-rose-900">
                    Click here to sign in →
                  </Link>
                </span>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.name ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: '' })); }}
                onBlur={() => setErrors((p) => ({ ...p, name: validateName(name) }))}
                placeholder="Sona Alexander"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-stone-200 focus:border-emerald-600'}`}
              />
            </div>
            {errors.name && <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Email Address * <span className="font-normal text-stone-400 lowercase">(must be @gmail.com)</span>
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.email ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: '' })); }}
                onBlur={() => setErrors((p) => ({ ...p, email: validateEmail(email) }))}
                placeholder="yourname@gmail.com"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${errors.email ? 'border-rose-400 bg-rose-50' : 'border-stone-200 focus:border-emerald-600'}`}
              />
            </div>
            {errors.email && <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
            {!errors.email && email.endsWith('@gmail.com') && (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Valid email address</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Phone Number * <span className="font-normal text-stone-400 lowercase">(10 digits)</span>
            </label>
            <div className="relative">
              <Phone className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.phone ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => setErrors((p) => ({ ...p, phone: validatePhone(phone) }))}
                placeholder="9847012345"
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]{10}"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${errors.phone ? 'border-rose-400 bg-rose-50' : 'border-stone-200 focus:border-emerald-600'}`}
              />
              <span className={`absolute right-3.5 top-3.5 text-[10px] font-mono font-bold ${phone.length === 10 ? 'text-emerald-600' : 'text-stone-400'}`}>
                {phone.length}/10
              </span>
            </div>
            {errors.phone && (
              <p className="mt-1 text-[11px] text-rose-600 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <span>
                  {errors.phone}
                  {errors.phone.includes('already registered') && (
                    <> <Link href="/login" className="underline font-bold">Go to Login →</Link></>
                  )}
                </span>
              </p>
            )}
            {!errors.phone && phone.length === 10 && (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Valid phone number</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.password ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: '' })); }}
                onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) }))}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${errors.password ? 'border-rose-400 bg-rose-50' : 'border-stone-200 focus:border-emerald-600'}`}
              />
            </div>
            {/* Strength meter */}
            {strength && (
              <div className="mt-1.5 space-y-0.5">
                <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                </div>
                <p className={`text-[10px] font-semibold ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</p>
              </div>
            )}
            {errors.password && <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-3.5 w-4 h-4 ${errors.confirmPassword ? 'text-rose-400' : 'text-stone-400'}`} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: '' })); }}
                onBlur={() => setErrors((p) => ({ ...p, confirmPassword: validateConfirmPassword(confirmPassword) }))}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${errors.confirmPassword ? 'border-rose-400 bg-rose-50' : 'border-stone-200 focus:border-emerald-600'}`}
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.confirmPassword}</p>}
            {!errors.confirmPassword && confirmPassword && confirmPassword === password && (
              <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passwords match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-500">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-800 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
