import mongoose  from "mongoose";

// product kenek save karaddi eyata adala formate eka liyanne mehem 
const ProductSchema = mongoose.Schema(    
   {
      productId : {
         type: String,
         required: true,
         unique: true
      },
      name: {
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
      imges: [
         { type: String }
      ],
      labeledPrice :{
         type: Number,
         required: true
      },
      price :{
         type: Number,
         required: true
      },
      stoke:{
         type: Number,
         required: true
      },
      isAvailable:{
         type: Boolean,
         required: true,
         default: true
      }
    
   }

);

// "product" kiyan namin collection ekak hadala ee namta productschema eka adesha karala mongoos data base eka ekka connect kranawa 
const Product  = mongoose.model("product",ProductSchema)

export default Product ;   //Product eka access karnna puluwan widihat export karanwa
