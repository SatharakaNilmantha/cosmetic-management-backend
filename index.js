import dotenv from "dotenv";
dotenv.config(); // .env file eke thiyana environment variables load karanawa

import express from  "express";   // es6 wala import karanna ona nisa me widiyata karanne
import bodyParser from "body-parser";   // body parser eka import karanawa (json data tika read karanna Saha json type widihata convert karanna)
 

import mongoose from "mongoose";  // mongoose eka import karanawa (mongo db ekata connect karanna)

import productRouter from "./routes/productRouter.js"; // productRouter eka import karanawa
import userRouter from "./routes/userRouter.js"; // userRouter eka import karanawa

import { authMiddleware } from "./middleware/authMiddleware.js";// authMiddleware eka import karanawa



// ======================================
// Express app එක ready කිරීම
// ======================================
const app = express();        // express eka app variable ekata assign karanawa
app.use(bodyParser.json());  // client එකෙන් එන JSON data වැටගත් කරගන්න(json data tika read karanna Saha json type widihata convert karanna)

app.use(authMiddleware); // authMiddleware eka app eke use karanawa



// =================================================================================================
// MongoDB Database එක connect කිරීම  (mongo db data base eka saha backend eka connect kara ganna wa)
// =================================================================================================
const mongoURL = process.env.MONGO_URL; // .env file eke thiyana MONGO_URL variable eka athuleuth gannawa
mongoose.connect(mongoURL)
.then(()=>{
    console.log("connect to the data base")
}
).catch(()=>{
    console.log("database connection fail")
}  
);


// ======================================
// Routes එක set කිරීම
// ======================================

app.use("/products", productRouter);// productRouter eka app eke use karanawa /products path ekata


app.use("/users", userRouter); // userRouter eka app eke use karanawa /users path ekata



// ====================================== 
// Server එක start කරන කොටස
// ======================================
const port = process.env.PORT || 3000; // .env file eke thiyana PORT variable eka athuleuth gannawa naththam 3000 use karanawa   
app.listen(port,successfullyStart);

function successfullyStart(){
    console.log(`server is run on port ${port}`);
}

// yata eka pawichchi karana eka lesi meya hama thanatama pawichchi wen nathi nisa
app.listen(3000,()=>{
   console.log(`server is run on port ${port}`);
   }
);