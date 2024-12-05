import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
lastLogin:{
    type:Date,
    default:Date.now
},
isVerfied:{
    type:Boolean,
    default:false
},
resetPasswordToken: String,
resetPasswordExpireAt:Date,
verficationToken:String,
verificationTokenExpireAt:Date,

},


{timestamps:true});

export const User= mongoose.model('User',userSchema);
