

import mongoose  from "mongoose";

const orderSchema = new mongoose.Schema({

    orderId : {
        type: String,
        required: true, 
        unique: true
    },
    
    email : {
        type: String,
        required: true
    },

    name : {
        type: String,
        required: true
    },

    address : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    
    status : {
        type: String,
        required: true,
        default: "Pending"
    },

    total : {
        type: Number,
        required: true
    },
    labeledTotal : {
        type: Number,
        required: true
    },

    products : [
        { 
            productInfo: {
                productId : {   
                    type: String,
                    required: true
                },

                name : {
                    type: String,
                    required: true
                },
                altNames:[
                    { type: String }
                ],
                description : {
                    type: String,
                    required: true  
                },

                labeledPrice :{ 
                    type: Number,
                    required: true
                },
                price :{
                    type: Number,
                    required: true
                },
               imges : [
                    { type: String }
                ]
            },

            quantity : {
                type: Number,
                required: true
            }
        }
    ],  
    
    date : {
        type: Date,
        required: true,
        default: Date.now
    }   

});

const Order  = mongoose.model("order",orderSchema);

export default  Order ;