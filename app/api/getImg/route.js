
import connectDB from "@/db/connectDb";
import Photo from "@/model/Photo";

import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connectDB();
        const userEmail = request.headers.get('x-user-email');
  
        const photo = await Photo.findOne({email:userEmail}).sort({ createdAt: -1 }); // Get the latest photo

        if (!photo) {
            return NextResponse.json({ response: "No images found", success: false });
        }

        return new NextResponse(photo.img.buffer, {
            headers: {
                'Content-Type': photo.contentType,
                'Content-Length': photo.img.length,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ response: "Internal Server Error", success: false });
    }
}
