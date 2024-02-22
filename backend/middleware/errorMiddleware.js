const notFound = (req,res,next)=>{
    let error  = new Error(`Not Found -${originalURL}`)
    res.statusCode(404)
    next(error)
}

let errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode===200 ? 500 : res.statusCode
    let message = err.message

    if(err.name==="CastError" && err.kind==="objectId"){
        statusCode = 404
        message = "Resource Not Found"
    }
    res.status(statusCode).json({
        message,
        stack : process.env.NODE_ENV==="production" ? null : err.stack
    })
}

export {
    notFound,errorHandler
}











































