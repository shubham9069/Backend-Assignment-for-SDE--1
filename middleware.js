const jwt = require('jsonwebtoken');
require('dotenv').config();

const middleware = async (req, res, next) => {
    // client side use Bearer secret key  
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(501).json({ message: "no token provided " })

    
    const cookie = req.cookies
    
    const Atoken = authHeader.split(' ')[1];
    jwt.verify(
        Atoken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {

            if (err) return res.status(501).json({ message: "token is not verify or expire " });
            if (cookie?.user_id != decoded.user_id){
                return res.status(501).json({ message: "user not login " });
            }
            req.user_id = decoded.user_id;

            next();
        }

    )

}




module.exports = middleware;