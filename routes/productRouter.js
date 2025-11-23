import express from "express";

import { saveProduct,getProducts} from "../controllers/productController.js"; // studentController eke functions tika import karanawa


const productRouter = express.Router(); // productRouter eka express Router ekak widihata define karanawa

productRouter.post("/saveproduct",saveProduct); // POST : SAVE PRODUCT DATA

productRouter.get("/getproducts" ,getProducts); // GET : FETCH PRODUCT DATA


export default productRouter;  //productRouter eka export karanawa