const jwt =  require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.protectRoute = async(req,res,next) => {
    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"unauthorized No token provided",
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401),json({
                success:false,
                message:"unauthorized invalid Token",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protected route");
        return res.status(500).json({
            success:false,
            message:"Internal server error in protected route",
        });
    }
}