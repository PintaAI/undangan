import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Guest {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to generate unique guest ID with simple increment
async function generateGuestId(): Promise<string> {
  try {
    // Get all existing guests to find the highest number
    const { blobs } = await list({
      prefix: 'guest-',
    });

    let maxNumber = 0;
    
    // Extract numbers from existing guest IDs
    blobs.forEach(blob => {
      const match = blob.pathname.match(/guest-(\d+)\.json$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNumber) {
          maxNumber = num;
        }
      }
    });

    // Increment by 1
    const nextNumber = maxNumber + 1;
    return `guest-${String(nextNumber).padStart(4, '0')}`;
  } catch (error) {
    // Fallback to timestamp if there's an error
    console.error('Error generating guest ID:', error);
    return `guest-${Date.now()}`;
  }
}

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'guest-',
    });

    const guests = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          const data = await response.json();
          return {
            ...data,
            blobUrl: blob.url,
            uploadedAt: blob.uploadedAt,
          };
        } catch (error) {
          console.error(`Error fetching guest blob ${blob.pathname}:`, error);
          return null;
        }
      })
    );

    const validGuests = guests
      .filter((guest) => guest !== null)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return NextResponse.json({
      success: true,
      count: validGuests.length,
      guests: validGuests,
    });
  } catch (error) {
    console.error('Error listing guests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Guest name is required' },
        { status: 400 }
      );
    }

    // Generate unique guest ID
    const id = await generateGuestId();

    const guest: Guest = {
      id,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const filename = `guest-${id}.json`;

    const blob = await put(filename, JSON.stringify(guest, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      message: 'Guest created successfully',
      data: {
        url: blob.url,
        pathname: blob.pathname,
        guest,
      },
    });
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { error: 'Failed to create guest. Please try again.' },
      { status: 500 }
    );
  }
}