import express from "express";

import { saveProduct,getProducts ,deleteProduct ,updateProduct} from "../controllers/productController.js"; // studentController eke functions tika import karanawa


const productRouter = express.Router(); // productRouter eka express Router ekak widihata define karanawa

productRouter.post("/saveproduct",saveProduct); // POST : SAVE PRODUCT DATA

productRouter.get("/getproducts" ,getProducts); // GET : FETCH PRODUCT DATA

productRouter.delete("/deleteproduct/:id" , deleteProduct); // DELETE : DELETE PRODUCT DATA

productRouter.put("/updateproduct/:id" , updateProduct); // PUT : UPDATE PRODUCT DATA


export default productRouter;  //productRouter eka export karanawa