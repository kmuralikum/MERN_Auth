import jwt from "jsonwebtoken"

const generateToken = (res,userId)=> {
      const token = jwt.sign({userId},process.env.secret,{
        expiresIn:"30d"
      })

      res.cookie("jwt",token,{
        httpOnly : true, 
        secure : process.env.NODE_ENV!=="development",
        sameSite : "strict" 
      })   
}

export default generateToken