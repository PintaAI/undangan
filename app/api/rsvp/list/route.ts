import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'rsvp-',
    });

    // Fetch and parse each RSVP JSON file
    const rsvps = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          const data = await response.json();
          // Extract unique ID from the blob pathname
          const id = blob.pathname.replace('rsvp-', '').replace('.json', '');
          return {
            ...data,
            id,
            blobUrl: blob.url,
            uploadedAt: blob.uploadedAt,
          };
        } catch (error) {
          console.error(`Error fetching blob ${blob.pathname}:`, error);
          return null;
        }
      })
    );

    // Filter out any failed fetches and sort by submission date
    const validRsvps = rsvps
      .filter((rsvp) => rsvp !== null)
      .sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

    return NextResponse.json({
      success: true,
      count: validRsvps.length,
      rsvps: validRsvps,
    });
  } catch (error) {
    console.error('Error listing RSVPs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
}