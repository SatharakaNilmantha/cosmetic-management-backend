import Product from "../models/product.js"; // student model eka import karanawa
import { isAdmin } from "./userController.js";

// ==================================================
// POST : SAVE PRODUCT DATA
// ==================================================
export const saveProduct = async (req, res) => {
  try{

        console.log("user in save product: "+ JSON.stringify(req.userData)) ; // middleware eke thiyana userData eka meka athuleuth ganna puluwan

         if (!isAdmin(req,res)){
            return res.status(403).json({
                status: "error",
                message: "You do not have permission to add products !."
            });
         }


        const product = new Product({
            productId : req.body.productId,
            name : req.body.name,
            altNames : req.body.altNames,   
            description : req.body.description,
            imges : req.body.imges,
            labeledPrice : req.body.labeledPrice,
            price : req.body.price,
            stoke : req.body.stoke
        });

       await product.save();

       return res.status(201).json({
            status: "success",
            message: "Product saved successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error
        });
    }
}



// ==================================================
// GET : FETCH PRODUCT DATA
// ==================================================
export const  getProducts = async (req, res) => {

    
    try {

      if (isAdmin(req,res)){

        const products = await Product.find(); // database eke thiyana product data tika gannawa    
        return  res.status(200).json({
            status: "success",
            data: products
        });

      }else{
        const products = await Product.find({ isAvailable: true }); // database eke thiyana product data tika gannawa    
        return  res.status(200).json({
            status: "success",
            data: products
        }); 
     }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error
        });
    }
  
}