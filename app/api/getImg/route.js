import connectDB from "@/db/connectDb";
import Photo from "@/model/Photo";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const photo = await Photo.findOne().sort({ createdAt: -1 });

    if (!photo) {
      return NextResponse.json({ response: "No images found", success: false }, { status: 404 });
    }

    return new NextResponse(photo.img.buffer, {
      headers: {
        'Content-Type': photo.contentType,
        'Content-Length': photo.img.length,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      },
    });
  } catch (error) {
    console.error("Internal Server Error", error);
    return NextResponse.json({ response: "Internal Server Error", success: false }, { status: 500 });
  }
}
