"use server";
import connectDB from "@/db/connectDb";
import Items from "@/model/Items";
import SignUp from "@/model/SignUp";
import Address from "@/model/Address";

// Store sign up data into the database
export const storeData = async (data) => {


    


    await connectDB();
    //check user is awailable or not
    const u = await SignUp.findOne({ email: data.email });
    if (u && u.email) {
        return { error: "User already exists" };
    }
    else {

        const signUp = new SignUp(data);

        await signUp.save();
        const plainSignUp = signUp.toObject({ getters: true, versionKey: false }); // Converts the document to a plain object
        plainSignUp._id = plainSignUp._id.toString();
        return plainSignUp;
    }
}
export const storeItem = async (data) => {




    await connectDB();


    const newItems = new Items(data);

    
    await newItems.save();
    const plainnewItems = newItems.toObject({ getters: true, versionKey: false }); // Converts the document to a plain object
    plainnewItems._id = plainnewItems._id.toString();
    return plainnewItems;

}
export const storeAddress = async (data) => {




    
    await connectDB();


    const newAddress= new Address(data);

    
    await newAddress.save();
    const plainnewAddress = newAddress.toObject({ getters: true, versionKey: false }); // Converts the document to a plain object
    plainnewAddress._id = plainnewAddress._id.toString();
    return plainnewAddress;

}


//fetch all data from the database
export const fetchAllData = async (email) => {
    await connectDB();
    let data = await SignUp.findOne({ email: email });
    let user = data.toObject({ flattenObjectIds: true })
    return user;
}

// fetch storeitemdata
export const fetchStoreItemData = async (email) => {
    await connectDB();

    let data = await Items.find({ email: email });
    if (!data) {
        return null
    }
    else {

        let user = data.map(item=>item.toObject({ flattenObjectIds: true }))
        return user;
    }
}

export const updateProfile = async (data, oldemail) => {
    // Update profile
    let ndata = Object.fromEntries(data);
  
    // Check if the new name already exists
    let u = await SignUp.findOne({ email: ndata.email });
    if (u && oldemail !== ndata.email) {
      return { error: "Name already exists" };
    }
  
    // Update SignUp collection
    await SignUp.updateOne({ email: ndata.email }, {
      $set: {
        name: ndata.name,
        username: ndata.username,
        password: ndata.password
      }
    });
  
    // Update Payment collection (if necessary)
    // await Payment.updateMany({ to_user: oldusername }, {
    //   $set: {
    //     to_user: ndata.username
    //   }
    // });
  };
