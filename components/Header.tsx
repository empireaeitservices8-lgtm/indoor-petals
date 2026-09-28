'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import SearchBar from './SearchBar';
import { categories } from '@/data/categories';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { customer, isAuthenticated } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'Services', href: '/services' },
    { name: 'Order Tracking', href: '/order-tracking' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-md py-2.5' : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-stone-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                      onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 text-xs xl:text-sm font-bold tracking-wide transition-colors ${
                          isActive ? 'text-emerald-800' : 'text-stone-700 hover:text-emerald-700'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                      </Link>

                      {/* Mega Dropdown Menu for all 13 Categories */}
                      {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-white rounded-3xl p-5 shadow-2xl border border-stone-200/90 animate-slide-up grid grid-cols-2 gap-2 z-50">
                          <div className="col-span-2 pb-2 mb-1 border-b border-stone-100 flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950">
                              Explore All {categories.length} Botanical Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[11px] font-bold text-emerald-700 hover:underline"
                            >
                              View All Products →
                            </Link>
                          </div>
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products/${cat.slug}`}
                              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50/80 text-stone-800 hover:text-emerald-900 transition-colors group/item"
                            >
                              <span className="text-xl shrink-0 group-hover/item:scale-110 transition-transform">
                                {cat.icon}
                              </span>
                              <div className="truncate">
                                <span className="text-xs font-bold block truncate">{cat.name}</span>
                                <span className="text-[10px] text-stone-400 block truncate">{cat.itemCount} {cat.itemCount === 1 ? 'Product' : 'Products'}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs xl:text-sm font-bold tracking-wide transition-colors relative py-1 ${
                      isActive ? 'text-emerald-800 font-extrabold' : 'text-stone-700 hover:text-emerald-700'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-2"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold text-stone-500">Search plants...</span>
              </button>

              {/* Wishlist Button with Badge */}
              <Link
                href="/wishlist"
                className="p-2.5 rounded-full hover:bg-rose-50 text-stone-700 hover:text-rose-600 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger with Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors relative"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Customer Account Button */}
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/50 text-stone-700 hover:text-emerald-900 transition-colors text-xs font-bold"
              >
                <User className="w-4 h-4 text-emerald-800" />
                <span className="truncate max-w-[100px]">
                  {isAuthenticated ? customer?.name?.split(' ')[0] : 'Sign In'}
                </span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-emerald-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-4/5 max-w-sm h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-stone-100 text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Quick Trigger */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-500 text-xs font-medium"
              >
                <Search className="w-4 h-4 text-emerald-700" />
                <span>Search all plants, pots &amp; codes...</span>
              </button>

              {/* Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      pathname === link.href ? 'bg-emerald-900 text-white' : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Categories Drawer Accordion */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400 px-4 mb-2">
                  All {categories.length} Categories
                </h4>
                <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-6 border-t border-stone-100 space-y-3">
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                className="w-full py-3 rounded-xl bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>{isAuthenticated ? 'My Account & Orders' : 'Sign In / Register'}</span>
              </Link>

              <div className="text-center text-[11px] text-stone-500">
                🌿 Fresh Indoor Plants &amp; Gardening Solutions
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
