const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.DB_URL);

        console.log("DB CONNECTION SUCCESSFULL ");
    }
    catch(err) {    
        console.log("DB CONNECTION ISSUES");
        console.log(err);
        process.exit(1);
    }

}
module.exports = dbConnect;