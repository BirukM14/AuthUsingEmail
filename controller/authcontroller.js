import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { sendVerificationEmail, sendwalcomeEmail, sendpasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { User } from "../models/usermodel.js";


export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
        verficationToken: code,
        verificationTokenExpireAt: { $gt: Date.now() },
    });
    console.log("debug 1", user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or xpired verifcaton ode",
      });
    }
    user.isVerfied = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    await sendwalcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "email veified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verify-email", error);
    res.status(500).json({ success: false, messsage: "server error" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({
      email: "biggiemerawi14@gmail.com",
    });
    console.log("useralreadyexos", userAlreadyExists);
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "user already exists. ",
      });
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    const verficationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log("Generated verification token:", verficationToken);

    const user = new User({
      email,
      password: hashedpassword,
      name,
      verficationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    await generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.email, verficationToken);

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
  
};

export const logout = async (req,res)=>{
  res.clearCookie("token");
  res.status(200).json({success:true, message:"logged out successfully"});
};

export const login = async (req,res)=>{
  const {email,password}= req.body;
  
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success:false, message:"invalid credential"});
    }
    const ispasswordValid = await bcryptjs.compare(password,user.password);

    if(!ispasswordValid){
      return res.status(400).json({success:false, message:"invalid credential"})
    }
    generateTokenAndSetCookie(res,user._id)
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json({success:true,message:"successfullu logged"})
   

}catch(error){
  console.log("error in login", error);
  res.status(500).json({success:false,message:error.message})

}
};
export const forgotpassword = async (req,res)=>{
  const {email}=req.body
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({sucess:false,message:"user not found"});
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt=Date.now()+1*60*60*1000;

    user.resetPasswordToken= resetToken;
    user.resetPasswordExpireAt=resetTokenExpiresAt;

    await user.save();

    await sendpasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({success:true,message:"password reset link sent to your email"});

  }catch(error){
    console.log("error in forgotpassword",error);
    res.status(400).json({success:false,message:error.message});
  }
};

export const resetpassword = async (req,res)=>{
  try{
    const {token}= req.params;
    const {password}= req.params;

    const user = await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpireAt:{ $gt:Date.now()},
    });
    if(!user){
        return res.status(400).json({success:false,message:"invalid or expired reset token"})
    }

    const hashedpassword = await bcryptjs.hash(password,10)
    user.password = hashedpassword;
    user.resetPasswordExpireAt=undefined;
    user.resetPasswordToken=undefined;
    await user.save();

    await sendResetSuccessEmail(user.email)

  }catch(error){

  }
};

export const verifyToken= async (req,res)=>{
  
}

export const checkAuth = async (req,res)=>{
  try{
    const user = await User.findById(req.userId).select("-password");
    if(!user){
      return res.status(400).json({success:false,message:"user not found"})
    }
    res.status(200).json({success:true,user})

  }catch(error){
    console.log("error in checkauth",error);
    res.status(400).json({success:false,message:error.message})

  }
}