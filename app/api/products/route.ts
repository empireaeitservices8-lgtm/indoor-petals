import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('search')?.toLowerCase();
  const featured = searchParams.get('featured');

  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  if (query) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      p.productCode.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}
