// make sign up model in mogoose 
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,required:true
    },
    email: {
        type: String,required:true
        },
    chating: {
        type: String,required:true
    },
  
  
    

    createdAt: {
        type: Date, default: Date.now
    },
    updateddAt: {
        type: Date, default: Date.now
    },



})


export default mongoose.models.Chat || model("Chat",userSchema) 