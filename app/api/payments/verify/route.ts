import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing required signature verification fields.' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Signature verification failed. Potential fraudulent tampering.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (err: any) {
    console.error('Payment signature verification error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal verification failure.' },
      { status: 500 }
    );
  }
}
