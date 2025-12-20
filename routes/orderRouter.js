import express from "express";

import { createOrder } from "../controllers/orderController.js"; // orderController eke functions tika import karanawa

const orderRouter = express.Router(); // orderRouter eka express Router ekak widihata define karanawa

orderRouter.post("/createorder", createOrder); // POST : CREATE ORDER DATA

export default orderRouter;  //orderRouter eka export karanawa