const mongoose = require("mongoose");
require("dotenv").config();
 
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedToplogy: true
    })
    .then(() => console.log("DB Connected Succesfully"))
    .catch((error) => {
        console.log("DB Connection Failed")
        console.log(error)
        process.exit(1);
    })
};