// make sign up model in mogoose 
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    name: { type: String },
    amount: { type: String },
    email: { type: String },
    

    createdAt: {
        type: Date, default: Date.now
    },
    updateddAt: {
        type: Date, default: Date.now
    },



})


export default mongoose.models.Items || model("Items",userSchema) 