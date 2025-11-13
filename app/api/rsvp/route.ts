import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface RsvpData {
  fullName: string;
  attendance: string;
  message: string;
  submittedAt: string;
  guestId?: string;
  guestNameFromUrl?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, attendance, message, guestId, guestNameFromUrl } = body;

    // Validate required fields
    if (!fullName || !attendance) {
      return NextResponse.json(
        { error: 'Full name and attendance status are required' },
        { status: 400 }
      );
    }

    // Create RSVP data object
    const rsvpData: RsvpData = {
      fullName,
      attendance,
      message: message || '',
      submittedAt: new Date().toISOString(),
      guestId,
      guestNameFromUrl,
    };

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const filename = `rsvp-${sanitizedName}-${timestamp}.json`;

    // Save to Vercel Blob
    const blob = await put(filename, JSON.stringify(rsvpData, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      message: 'RSVP submitted successfully',
      data: {
        url: blob.url,
        pathname: blob.pathname,
      },
    });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to save RSVP. Please try again.' },
      { status: 500 }
    );
  }
}