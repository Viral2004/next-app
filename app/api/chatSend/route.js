import Chat from "@/model/Chat";
import connectDB from "@/db/connectDb";

import { NextResponse } from "next/server";


export const POST = async(request)=>{
    try {

        await connectDB();
        let data = await request.formData();
        let email =  data.get('email');
        let name =  data.get('name');
        let message = data.get('chating')
        console.log(data)

        if(!email){
            return new NextResponse({response:"Login required",success:false})
        }
        let newChat = new Chat({
            name:name,
            email:email,
            chating:message,

        });

        await newChat.save();
        
    return NextResponse.json({ response: "Successfully send", success: true });






        
    } catch (error) {

        
    return NextResponse.json({ response: "Failed to send", success: false });
        
    }







}