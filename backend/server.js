const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
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
server.listen(PORT,() => console.log(`app is running on port ${PORT}`));
