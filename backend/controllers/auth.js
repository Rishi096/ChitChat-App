const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utlis/generateTokens.js");
exports.signup = async (req, res) => {
    try {
        const { Fullname, username, password, confirmPassword, gender } = req.body;
        if (!Fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            Fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
    // generate jwt token here
    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            Fullname: newUser.Fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
            gender
        });
    }
    else{
        res.status(400).json({
            success:false,
            message: "Invalid user data"
        });
    }
}
    catch (error) {
        console.error("Error in signup controller", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        console.log(isPasswordCorrect);
        console.log(password);
        if(!password || !isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"Invalid username or password",
            });
        }
        // if(password !== isPasswordCorrect){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Invalid username or password",
        //     });
        // }
        
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            Fullname: user.Fullname,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("error in login controller",error.message);
        return res.status(500).json({
            success:false,
            message:"Error in login"
        })
    }

};

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({
            success:true,
            message:"logged Out successfully",
        });
        
    } catch (error) {
        console.log("error in logout controller",error.message);
        return res.status(500).json({
            success:false,
            message:"Error in logout"
        })
    }
};