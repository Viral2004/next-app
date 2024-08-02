import connectDB from "@/db/connectDb";
import Chat from "@/model/Chat";


import { NextResponse } from "next/server";


export const GET =  async(req)    =>{

   try {
    await connectDB();

    const userEmail =  req.headers.get('userEmail');
    // we dont get chat id so we got all message and email

    const chat = await Chat.find({ email: userEmail });
    
    let user = chat.map(item=>item.toObject({ flattenObjectIds: true }))
    console.log(user)

    return NextResponse.json(user);



   }catch(error){
     
    return NextResponse.json({ response: "Internal Server Error", success: false });

   }
   





    
   


}