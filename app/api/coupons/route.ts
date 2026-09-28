import { NextResponse } from 'next/server';
import { validCoupons } from '@/data/coupons';

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json();
    const formatted = (code || '').trim().toUpperCase();

    const coupon = validCoupons.find((c) => c.code === formatted);

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired coupon code.' },
        { status: 400 }
      );
    }

    if (subtotal !== undefined && subtotal < coupon.minSpend) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order value of ₹${coupon.minSpend} required for coupon "${coupon.code}".`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload.' },
      { status: 500 }
    );
  }
}
