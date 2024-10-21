
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure that username is unique
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
  
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
