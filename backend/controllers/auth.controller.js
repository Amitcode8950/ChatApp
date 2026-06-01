import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"
import cookieParser from "cookie-parser"
const signUp= async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const checkUserbyUsername= await User.findOne({username})
        if(checkUserbyUsername){
            return res.status(400).json({message:"Username already exists"})
        }
        const checkUserbyEmail= await User.findOne({email})
        if(checkUserbyEmail){
            return res.status(400).json({message:"email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters long"})
        }
        const passwordHash = await bcrypt.hash(password, 10)
       
        const user= await User.create({username,email,password:passwordHash})
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            secure:false
        })
        return res.status(201).json({message:"User created successfully",user})
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error})
    }
}


const login= async(req,res)=>{
    try {
        const {email,password}=req.body
        const checkUserbyEmail= await User.findOne({email})
        if(!checkUserbyEmail){
            return res.status(400).json({message:"email not exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters long"})
        }
        const ismatch=await bcrypt.compare(password,checkUserbyEmail.password)
        if(!ismatch){
            return res.status(400).json({message:"password not match"})
        }
       
        const token = await genToken(checkUserbyEmail._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            secure:false
        })
        return res.status(200).json({message:"User login successfully", user: checkUserbyEmail})
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error})
    }
}

const logout =async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"User logout successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error})
    }
}


export {signUp,login,logout}