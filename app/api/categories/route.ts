import { NextResponse } from 'next/server';
import { categories } from '@/data/categories';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: categories.length,
    data: categories,
  });
}
