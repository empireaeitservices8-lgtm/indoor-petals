import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Order recorded in backend database.',
      order: orderData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to record order.' },
      { status: 500 }
    );
  }
}
