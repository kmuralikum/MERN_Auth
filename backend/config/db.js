import mongoose from "mongoose"

const connectdb = mongoose.connect("mongodb://127.0.0.1/mernauth")
.then(()=>{console.log('db connected Succesfully')})
.catch((err)=>console.log(err))

export default connectdb