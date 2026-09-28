import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', showSubtitle = true }) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none shrink-0 ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        maxWidth: '180px',
      }}
    >
      <img
        src="/logo.png"
        alt="INDOOR PETALS"
        className="h-10 sm:h-11 w-auto max-w-[140px] sm:max-w-[170px] object-contain transition-transform duration-200 group-hover:scale-102"
        style={{
          height: '40px',
          maxHeight: '44px',
          width: 'auto',
          maxWidth: '170px',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent && !parent.querySelector('.logo-text-fallback')) {
            const span = document.createElement('span');
            span.className = 'logo-text-fallback font-black text-emerald-900 text-base tracking-tight';
            span.textContent = '🌿 INDOOR PETALS';
            parent.appendChild(span);
          }
        }}
      />
    </Link>
  );
};

export default Logo;
