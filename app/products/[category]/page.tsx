import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) {
    return { title: 'Category Not Found | INDOOR PETALS' };
  }
  return {
    title: `${category.name} | INDOOR PETALS - Indoor Plants & Gardening Solutions`,
    description: category.description,
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) => p.category === params.category || (params.category === 'plant-accessories' && (p.category === 'clay-balls' || p.category === 'plant-stones-pebbles'))
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5]">
      {/* Category Hero Banner */}
      <section className="bg-emerald-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{category.icon}</span>
                <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-900 border border-emerald-700 text-emerald-200 font-bold">
                  Category Collection
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black">{category.name}</h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="bg-emerald-900/80 p-4 rounded-2xl border border-emerald-700/60 shrink-0 text-center sm:text-right">
              <div className="text-2xl font-black text-amber-300">{categoryProducts.length}</div>
              <div className="text-xs text-emerald-200">
                {categoryProducts.length === 1 ? 'Available Product' : 'Available Products'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <ProductGrid
          products={categoryProducts}
          title={`Shop ${category.name}`}
          subtitle={`Showing all ${categoryProducts.length} curated ${categoryProducts.length === 1 ? 'product' : 'products'}`}
          showControls={true}
        />

        {/* Other Categories Carousel */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <h3 className="text-lg font-black text-emerald-950 mb-6">
            Explore Other Botanical Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories
              .filter((c) => c.slug !== params.category)
              .slice(0, 6)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-center flex flex-col items-center group"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-bold text-stone-800 group-hover:text-emerald-800 line-clamp-1">
                    {cat.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
