import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const sourcePath = 'C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\0bc61bba-b74b-413e-abec-5a1d78ed80ba\\.user_uploaded\\media_1790589143534.png';
    const publicPath = path.join(process.cwd(), 'public', 'logo.png');

    if (fs.existsSync(sourcePath)) {
      const buffer = fs.readFileSync(sourcePath);
      // Also ensure it's written to public/logo.png for static caching
      try {
        fs.writeFileSync(publicPath, buffer);
      } catch (e) {
        // write sync safe fallback
      }

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    if (fs.existsSync(publicPath)) {
      const buffer = fs.readFileSync(publicPath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return new NextResponse('Logo not found', { status: 404 });
  } catch (error) {
    return new NextResponse('Error loading logo', { status: 500 });
  }
}
