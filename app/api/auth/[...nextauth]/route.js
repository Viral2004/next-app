"use server"
import NextAuth from 'next-auth'
import mongoose from 'mongoose'
import connectDB from '@/db/connectDb'
import SignUp from '@/model/SignUp';
import CredentialsProvider from "next-auth/providers/credentials";

const { Schema, model } = mongoose;


const handler =  NextAuth({

    providers:[
        CredentialsProvider({
       
          name: "Credentials",
        
          credentials: {
            email: { input: "email", type: "email" },
            password: { input: "Password", type: "password" }
          },
          async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            await connectDB();
            const user = await SignUp.findOne({email:credentials.email})
          
      
            if (user&&user.password === credentials.password) {
               
              return user;
           
            } else {
         
              return null
      
             
            }
          }
        })
      ],
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
    
    }
},

async session({ session, user, token }) {
   
    
    return session
  },
 
})




export {handler as GET,  handler as POST }