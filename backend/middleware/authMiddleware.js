import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/user.js"


const protect = asyncHandler(async(req,res,next)=>{
     
    let token 
    token = req.cookies.jwt

    if(token){
        try{
         const decoded = jwt.verify(token,process.env.secret)
         req.user = await User.findById(decoded.userId).select("-password")
         next()
        }catch(error){
            res.status(400) 
            throw new Error("Not Authenticated , Invalid Token")
        }
    }else{
        res.status(401)
        throw new Error("Not Authenticated , No Token")
    }
})

export {
    protect
}