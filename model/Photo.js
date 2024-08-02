// make sign up model in mogoose 
import mongoose from "mongoose";
import { Content } from "next/font/google";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    img: { 
      type: Buffer, 
  
    },
   
    contentType:{
        type:String,
        required:true
    },

    createdAt: {
        type: Date, default: Date.now
    },
    updateddAt: {
        type: Date, default: Date.now
    },



})


export default mongoose.models.Photo || model("Photo",userSchema) 
