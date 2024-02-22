import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import connectdb from "./config/db.js"
import mongoose from "mongoose"



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))




dotenv.config()
const port = process.env.PORT || 5000





app.use(cookieParser())
app.use("/api/users",userRoutes)
app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})




