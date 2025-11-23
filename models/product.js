import mongoose  from "mongoose";

// product kenek save karaddi eyata adala formate eka liyanne mehem 
const ProductSchema = mongoose.Schema(    
   {
      name: {
         type: String,
         required: true
      },
      price :{
         type: Number,
         required: true
      },
      description : {
         type: String,
         required: true
      }
   }

);

// "product" kiyan namin collection ekak hadala ee namta productschema eka adesha karala mongoos data base eka ekka connect kranawa 
const Product  = mongoose.model("product",ProductSchema)

export default Product ;   //Product eka access karnna puluwan widihat export karanwa
