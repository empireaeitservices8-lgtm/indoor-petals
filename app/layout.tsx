import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'INDOOR PETALS - Indoor Plants, Planters & Gardening Solutions',
  description: 'Buy fresh indoor plants, tabletop greens, ceramic pots, fertilizers, and clay balls. Professional corporate plant rental, garden maintenance, and landscaping services by INDOOR PETALS.',
  keywords: [
    'Indoor plants',
    'Outdoor plants',
    'Tabletop plants',
    'Succulents and Cactus',
    'Ceramic pots',
    'Plastic planters',
    'Plant fertilizers',
    'Clay balls LECA',
    'Plant pebbles',
    'Plant gifts',
    'Plant rental',
    'Landscaping services',
    'Garden maintenance',
    'Office plant setup',
    'INDOOR PETALS',
  ],
  authors: [{ name: 'INDOOR PETALS' }],
  openGraph: {
    title: 'INDOOR PETALS - Indoor Plants & Gardening Solutions',
    description: 'Transform your spaces with fresh indoor greenery, artisanal pots, plant rentals, and landscaping.',
    siteName: 'INDOOR PETALS',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      emerald: {
                        50: '#ecfdf5',
                        100: '#d1fae5',
                        200: '#a7f3d0',
                        300: '#6ee7b7',
                        400: '#34d399',
                        500: '#10b981',
                        600: '#059669',
                        700: '#047857',
                        800: '#065f46',
                        900: '#064e3b',
                        950: '#04251a',
                      },
                      stone: {
                        50: '#fafaf9',
                        100: '#f5f5f4',
                        200: '#e7e5e4',
                        300: '#d6d3d1',
                        400: '#a8a29e',
                        500: '#78716c',
                        600: '#57534e',
                        700: '#44403c',
                        800: '#292524',
                        900: '#1c1917',
                        950: '#0c0a09',
                      }
                    },
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                      serif: ['"Playfair Display"', 'serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 font-sans">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
