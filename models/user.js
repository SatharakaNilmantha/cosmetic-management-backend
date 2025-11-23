import mongoose from "mongoose";

const UserSchema = mongoose.Schema(    
   {
      email :{
            type: String,
            required: true,
            unique: true
      },

      firstName: {
            type: String,
            required: true  
      },

      lastName: {   
            type: String,
            required: true  
      },

      password: {
            type: String,
            required: true
      },

      role : {
            type: String,
            required: true,
             default: "customer" // automatically set krnwa customer kiyana value eka
      },

      isBlocked: {
            type: Boolean,
            required: true,
            default: false
     },

     img : {
            type: String,
            required: false,
            default: "https://avatar.iran.liara.run/public/boy"
     }
   }
);

const User = mongoose.model("user", UserSchema);

export default User;   //User eka access karnna puluwan widihat export karanwa