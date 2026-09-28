import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, receipt, notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment amount.' },
        { status: 400 }
      );
    }

    const order = await createRazorpayOrder({
      amount: Number(amount),
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_IndoorPetalsDemo123',
    });
  } catch (err: any) {
    console.error('Payment order creation error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment order.' },
      { status: 500 }
    );
  }
}
