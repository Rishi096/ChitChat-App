const User = require("../models/user");


exports.getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUsers = req.user._id;

        const filteredUsers = await User.find({_id : {$ne : loggedInUsers}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar ",error);
        res.status(500).json({error:"internal server error"});
    }
}