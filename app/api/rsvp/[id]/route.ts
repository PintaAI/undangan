import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rsvpId } = await params;

    // Check if RSVP exists
    const existingRsvps = await list({
      prefix: `rsvp-`,
    });

    // Find the specific RSVP by matching the filename pattern
    const targetRsvp = existingRsvps.blobs.find(blob => 
      blob.pathname.includes(rsvpId)
    );

    if (!targetRsvp) {
      return NextResponse.json(
        { error: 'RSVP not found' },
        { status: 404 }
      );
    }

    // Delete RSVP blob
    await del(targetRsvp.url);

    return NextResponse.json({
      success: true,
      message: 'RSVP deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to delete RSVP. Please try again.' },
      { status: 500 }
    );
  }
}