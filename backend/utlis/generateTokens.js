const jwt =  require("jsonwebtoken");
require("dotenv").config();

exports.generateTokenAndSetCookie = (userId,res) => {
const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: '15d'
});

res.cookie("jwt",token,{
    maxAge: 15*24*60*60*1000,
    httpOnly:true,
    //httpOnly means only http can access cookie user can not access by js
    //it prevent xss attacks also called as cross-site scripting attacks
    sameSite:"strict", // CSRF attacks cross-site request forgery attacks

    secure:process.env.NODE_ENV !== "development",
});
};

