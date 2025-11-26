import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Guest {
  id: string;
  name: string;
  side?: 'male' | 'female';
  createdAt: string;
  updatedAt: string;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guestId } = await params;
    const body = await request.json();
    const { name, side } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Guest name is required' },
        { status: 400 }
      );
    }

    // Check if guest exists
    const existingGuests = await list({
      prefix: `guest-${guestId}`,
    });

    if (existingGuests.blobs.length === 0) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // Get existing guest data
    const existingBlob = existingGuests.blobs[0];
    const response = await fetch(existingBlob.url);
    const existingGuest: Guest = await response.json();

    // Update guest data
    const updatedGuest: Guest = {
      ...existingGuest,
      name,
      side: side || existingGuest.side || 'female',
      updatedAt: new Date().toISOString(),
    };

    // Delete old blob
    await del(existingBlob.url);

    // Create new blob with updated data
    const filename = `guest-${guestId}.json`;
    const blob = await put(filename, JSON.stringify(updatedGuest, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      message: 'Guest updated successfully',
      data: {
        url: blob.url,
        pathname: blob.pathname,
        guest: updatedGuest,
      },
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json(
      { error: 'Failed to update guest. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guestId } = await params;

    // Check if guest exists
    const existingGuests = await list({
      prefix: `guest-${guestId}`,
    });

    if (existingGuests.blobs.length === 0) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // Delete guest blob
    await del(existingGuests.blobs[0].url);

    return NextResponse.json({
      success: true,
      message: 'Guest deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return NextResponse.json(
      { error: 'Failed to delete guest. Please try again.' },
      { status: 500 }
    );
  }
}