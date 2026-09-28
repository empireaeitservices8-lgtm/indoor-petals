'use client';

import React from 'react';
import { instagramPosts } from '@/data/instagram';
import { Heart, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="w-full py-16 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>@indoorpetals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Follow Us on Instagram
            </h2>
            <p className="text-sm sm:text-base text-emerald-200/80 mt-1 max-w-xl">
              Get daily plant care rituals, interior styling inspiration, behind-the-scenes nursery updates, and new arrivals.
            </p>
          </div>

          <a
            href="https://instagram.com/indoorpetals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-100 font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-emerald-900" />
            <span>Follow @indoorpetals</span>
            <ArrowUpRight className="w-4 h-4 text-stone-400" />
          </a>
        </div>

        {/* 6-Item Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-emerald-900/60 block border border-emerald-800/40 shadow-sm"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #064e3b, #065f46)';
                  }
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-100 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                  View post <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
