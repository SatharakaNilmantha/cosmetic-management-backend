import Product from "../models/product.js"; // student model eka import karanawa

// ==================================================
// POST : SAVE PRODUCT DATA
// ==================================================
export const saveProduct = async (req, res) => {
  try{

        console.log(req.userData) ; // middleware eke thiyana userData eka meka athuleuth ganna puluwan

        // userData naththam aththatama login wela nathiwa product ekak add karanna ba kiyala pennanawa
        if(req.userData == null){
            return res.status(401).json({
                status: "error",
                message: "Authentication required. Please log in."
            });
        }

        // userData thiyenawanam e userta admin role ekak thiyenawanam naththam product ekak add karanna ba kiyala pennanawa
        if(req.userData.role !== 'admin'){
            return res.status(403).json({
                status: "error",
                message: "Permission denied. Only admins can add products."
            });
        }

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
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
export function getProducts(req, res) {
    Product.find()
        .then((data) => {
            res.status(200).json({
                status: "success",
                message: "Product details fetched successfully",
                data: data
            });
        })
        .catch(() => {
            res.status(500).json({
                status: "error",
                message: "Failed to fetch student details"
            });
        });
}
