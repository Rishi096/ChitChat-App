const express = require("express");
const router = express.Router();

const {login,signup,logout} = require("../controllers/auth")
// Login
router.post("/login",login);

// Signup
router.post("/signup",signup);
// Logout
router.post("/logout",logout);
module.exports = router;