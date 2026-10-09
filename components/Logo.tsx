import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  imgClassName?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  imgClassName = '',
  showSubtitle = true,
}) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none shrink-0 ${className}`}
    >
      <img
        src="/logo.png"
        alt="INDOOR PETALS"
        className={
          imgClassName ||
          'w-[155px] min-[390px]:w-[170px] sm:w-[180px] md:w-[195px] lg:w-[210px] xl:w-[225px] h-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]'
        }
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent && !parent.querySelector('.logo-text-fallback')) {
            const span = document.createElement('span');
            span.className = 'logo-text-fallback font-black text-emerald-950 text-xl tracking-tight';
            span.textContent = '🌿 INDOOR PETALS';
            parent.appendChild(span);
          }
        }}
      />
    </Link>
  );
};

export default Logo;
