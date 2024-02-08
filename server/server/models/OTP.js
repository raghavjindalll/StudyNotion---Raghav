const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
})

// Function to send email

async function sendVerificationEmail(email, otp){
    try{
        const mailresponse = await mailSender(email, "Verification E-mail from StudyNotion", otp)
        console.log("Email sent successfully", mailresponse)
    }
    catch(error){
        console.log("Error in sending mail", error)
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.Schema("OTP", OTPSchema)