import connectDB from "@/db/connectDb";
import Photo from "@/model/Photo";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();
    const data = await request.formData();
    const file = data.get('file');
    const email = data.get('email');

    if (!file || !email) {
      return NextResponse.json({ success: false, message: 'File or email missing' });
    }

    const fileBuffers = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffers);

    const newPhoto = new Photo({
      img: buffer,
      email: email,
      contentType: file.type
    });

    await newPhoto.save();
    return NextResponse.json({ response: "Successfully Uploaded", success: true });
  } catch (error) {
    
    return NextResponse.json({ response: "Failed to Upload", success: false });
  }
}
