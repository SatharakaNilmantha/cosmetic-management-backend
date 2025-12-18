import jwt from "jsonwebtoken"; // JWT token verify karanna jwt library eka import karanawa

// =================================================================================================
// CORS Middleware එක set කිරීම
// =================================================================================================

export const authMiddleware = (req, res, next) => {

    const stringToken = req.header("Authorization") // header eke Authorization field ekan token eka gannawa

    console.log("beforeToken :",stringToken); 

    //token eka thiyenawanam
    if (stringToken != null) {

        const token = stringToken.replace("Bearer ", ""); // Bearer token eka nisa Bearer kiyala thiyana eka remove karanawa
        console.log("Token :",token);

        const secret = process.env.JWT_SECRET; // secret key eka .env file eke thiyana JWT_SECRET variable eka athuleuth gannawa
        console.log("Secret Key :",secret); 

        jwt.verify(token, secret, (err, decoded) => {  // token eka verify karanawa secretkey ekata anusaren

            if (decoded != null) {
                console.log("Decoded Token :",decoded);
                 req.userData = decoded;   // token eka niwaradi nam decode data req.userData ekata assign karanawa
                 next();  // e adala userta yanna puluwan than walata yanna puluwan widihata next() function eka call karala permition denawa
            }else{
                return res.status(403).json({  // user  token eka valid naththam (Waradinam ) 401 Unauthorized response ekak yawanawa
                    status: "error",
                    message: "Invalid token "
                });
            }
        } )   
 
    }else {
        next();  // token ekak naththam next() function eka call karanawa
                 // login wage page wala token ekak naththam e page walata yanna puluwan widihata permition denawa
    }
};