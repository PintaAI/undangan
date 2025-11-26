import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const CONFIG_FILENAME = 'wedding-config.json';

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: CONFIG_FILENAME,
    });

    if (blobs.length === 0) {
      // Return default configuration if no file exists
      return NextResponse.json({
        events: [
          {
            id: 'akad',
            title: "Akad Nikah",
            time: "07.00 WIB",
            venue: "Gedung Sasanagita",
            address: "Tejosari, Parakan, Temanggung",
            mapLink: "https://maps.app.goo.gl/9yTCxro8usPdSFB36?g_st=ic",
            description: "Acara akad nikah akan dilaksanakan di Gedung Sasanagita",
            side: "female"
          },
          {
            id: 'resepsi',
            title: "Resepsi",
            time: "10.00 WIB",
            venue: "Gedung Sasanagita",
            address: "Tejosari, Parakan, Temanggung",
            mapLink: "https://maps.app.goo.gl/9yTCxro8usPdSFB36?g_st=ic",
            description: "Acara resepsi akan dilaksanakan di Gedung Sasanagita",
            side: "female"
          },
          {
            id: 'ngunduh',
            title: "Ngunduh Mantu",
            time: "Menunggu Konfirmasi",
            venue: "Kediaman Mempelai Pria",
            address: "Lokasi Pihak Pria",
            mapLink: "#",
            description: "Informasi lokasi dan waktu akan menyusul.",
            side: "male"
          }
        ]
      });
    }

    const response = await fetch(blobs[0].url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if config exists and delete old one
    const { blobs } = await list({
      prefix: CONFIG_FILENAME,
    });

    if (blobs.length > 0) {
      await del(blobs[0].url);
    }

    // Save new config
    const blob = await put(CONFIG_FILENAME, JSON.stringify(body, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      message: 'Configuration updated successfully',
      data: body
    });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}