import { NextResponse } from 'next/server';
import { checkPincodeServiceability } from '@/data/pincodes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode') || '';

  const location = checkPincodeServiceability(pincode);

  return NextResponse.json({
    success: true,
    data: location,
  });
}
