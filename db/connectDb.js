import mongoose from "mongoose";
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/SignUp`, {
       
      });
    
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB