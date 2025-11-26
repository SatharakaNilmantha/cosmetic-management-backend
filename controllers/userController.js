import User from "../models/user.js"; // user model eka import karanawa

import bcrypt from "bcrypt"; // password hashing karanna bcryptjs library eka import karanawa

import jwt from "jsonwebtoken"; // JWT token generate karanna jwt library eka import karanawa


// ==================================================       
// POST : SAVE USER DATA
// ==================================================
export const saveUser = async (req, res) => {
  
   try{

    const existEmail = await User.findOne({ email: req.body.email }); // email eka adala user ekak thiyenawada kiyala balanawa

    if (existEmail != null) {  // email eka adala user ekak thiyenawanam
        return res.status(400).json({
            status: "error",
            message: "Email already exists"
        });
    }

     const hashPassword =  bcrypt.hashSync(req.body.password, 10); // password eka hash karanawa 10 salt rounds walin

     const user = new User({    
      email : req.body.email,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      password : hashPassword,    // <-- මෙතන hashed password save වෙනවා
      role : req.body.role
     });

     await user.save();

     return res.status(201).json({ 
      status: "success",
      message: "User saved successfully" 
   });

   } catch (error) {
     console.error("Error saving user:", error);

     return res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
     });

   }
};


// ==================================================       
// POST : USER LOGIN
// ==================================================
export const userLogin = async (req, res) => {
   try {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });  // email eka adala user wa hoya gannawa

    // Check if user exists 
    if (user == null) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password); // password eka verify karanawa

    if (isPasswordCorrect) {    // password correct nam

     // Generate JWT token --------------------------------------------------

      const secret = process.env.JWT_SECRET; // dev fallback; use .env in production



      
      const token = jwt.sign(
          { 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName, 
            role: user.role,
            imgurl: user.img
          },
          secret, // secret key eka
          { expiresIn: "1h" } // token eka 1 hour valid wenawa
        );  
      //-----------------------------------------------------------------------
        return res.status(200).json({
          status: "success",
          message: "Login successful",
          token: token
        });

    }else {
      return res.status(401).json({
        status: "error",
        message: "Invalid password"
      });
    
  }

  } catch (error) {

    console.error("Error during login:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }

};

// ==================================================       
// GET : FETCH ALL USERS
// ==================================================
export const getAllUsers = async (req, res) => {
   try{

     const users = await User.find();

     return res.status(200).json({ 
      status: "success",
      data: users
     });

   } catch (error) {
     console.error("Error fetching users:", error);

     return res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
     });
   }
};