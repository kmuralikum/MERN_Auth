import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/user.js"

// @desc    Auth User/set token
// route    POST api/users/auth/
// @access  Public
const authUser = asyncHandler(async(req,res)=>{
// res.status(401)
// throw new Error("Something went wrong")

  const {email,password} = req.body

  const createUser = await User.findOne({email})

  if(createUser && await(createUser.matchPassword(password))){
    generateToken(res,createUser._id)
    res.status(201).json({createUser})
 }else{
    res.status(401)
    throw new Error ("invalid email or password")
}


})


// @desc    register a new user
// route    POST api/users/
// @access  Public
const registerUser = asyncHandler(async(req,res)=>{
    
    const {name,email,password,role } = req.body

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error ("user Already Exist")
    }

    const createUser = await User.create({
        name,
        email, 
        password,
        role
    })
 
    if(createUser){
        generateToken(res,createUser._id)
        res.status(201).json({createUser})
    }else{
        res.status(400)
        throw new Error ("invalid user data")
    }

    
    // res.status(200).json({msg:" Register User"})
})

// @desc    logout user
// route    POST api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({msg:" User logged out"})
})

// @desc    Get user profile
// route    GET api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req,res)=>{
       const user =  await User.findById(req.user._id)
       if(user){
         user.name = req.body.name|| user.name
         user.email = req.body.email || user.email
         user.role = req.body.role || user.role

         if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            role : updatedUser.role
        })
       }else{
        res.status(404)
        throw new Error("User Not Found")
       }
    
})

// @desc    Update user profile
// route    PUT api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = ({
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email,
        role : req.user.role 
    })
    res.status(200).json({user})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}