import Order from "../models/order.js";

import Product from "../models/product.js";

export const createOrder = async (req , res) =>{
    
    try {

       if (req.userData == null){ // userData naththam aththatama login wela nathiwa adala  wade karanna ba kiyala pennanawa
            return res.status(403).json({ 
                status: "error",
                message: "You do not have permission to create orders !." 
            });
       }
      
       const  orderInfo = req.body;  // order data eka request body eken gannawa


       //=========================================
       //name field eka naththam userge firstName saha lastName eka mila gannawa
       //=========================================

       if(orderInfo.name == null ){
          orderInfo.name = req.userData.firstName + " " + req.userData.lastName; // order eke name naththam userge firstName saha lastName eka mila gannawa
       }
       
      //=========================================
      // orderId eka automatically hadanna puluwan widihata
      //=========================================

      const lastOrder = await Order.findOne().sort({ orderId: -1 }); // last orderId  eka gannawa 

      let orderId = "ORD000001"; // orderId eka hadanna puluwan widihata default value ekak dila thiyenawa

      if (lastOrder) {
          const lastOrderId = lastOrder.orderId; // last order eke orderId eka gannawa ("ORD000551" widihata thiyenawa)
          const numericPart = parseInt(lastOrderId.slice(3)); // orderId eke numeric part eka gannawa  ("000551" widihata thiyenawa)
          orderId = `ORD${(numericPart + 1).toString().padStart(6, "0")}`; // numeric part eka 1 ekak wadi karala eken new orderId eka hadanawa ("ORD000552" widihata)
        }
    
    //=========================================
    // products saha total , labeledTotal fields tika initialize karanawa
    //=========================================

    let total = 0;
    let labeledTotal = 0;
    const products = [];

    for (let i=0; i< orderInfo.products.length ; i++){

        const Item = await Product.findOne({ productId : orderInfo.products[i].productId }); // productId eka adala product eka gannawa (product module eke thiyana productId eka use karanawa)

        if (Item == null){
            return res.status(400).json({ 
                status: "error",
                message: `Product with ID ${orderInfo.products[i].productId} not found.` 
            });
        }

        if (!Item.isAvailable){
            return res.status(400).json({ 
                status: "error",
                message: `Product with ID ${orderInfo.products[i].productId} is not available.` 
            });
        }


        products[i] = {
            productInfo: {
            productId : Item.productId,
            name : Item.name,
            altNames: Item.altNames,
            imges : Item.imges,
            description : Item.description,
            price : Item.price,
            labeledPrice : Item.labeledPrice
    
            },

            quantity : orderInfo.products[i].quantity,
        };

        total = total + (Item.price * orderInfo.products[i].quantity); // calculate total price
        labeledTotal = labeledTotal + (Item.labeledPrice * orderInfo.products[i].quantity); // calculate labeled total price
    }

    //=========================================
    // new order ekak hadanawa (orderID + NAME + PRODUCTS + TOTAL + LABELEDTOTAL + EMAIL + ADDRESS + PHONE Bhawitha karala)
    //=========================================
       const newOrder = new Order({
            orderId: orderId,
            name: orderInfo.name,
            email : req.userData.email,
            address: orderInfo.address,
            total : total,
            labeledTotal : labeledTotal,
            phone: orderInfo.phone,
            products: products
        });

        await newOrder.save();

        res.status(201).json({ 
            status: "success",
            message: "Order created successfully", 
            order: newOrder 
        });

    } catch (error) {
       
        res.status(500).json({ 
            status: "error",
            message: "Internal server error" + error,
             
        });
    }
};