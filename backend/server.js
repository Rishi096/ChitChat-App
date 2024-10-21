const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");


const PORT = process.env.PORT || 3001;
const __dirName = path.resolve();
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/users");

const dbConnect = require("./database/database");
const { app, server } = require("./socket/socket");
dbConnect();


app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirName,"frontend/dist")));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirName,"frontend","dist","index.html"));
})
server.listen(PORT,() => console.log(`app is running on port ${PORT}`));
