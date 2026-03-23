import jwt from "jsonwebtoken"

const protect =async(req,res,next)=>{
   const token = req.headers.authorization.split(" ")[1]
   if(!token)
    return res.status(401).json({ message: "No token" })
else
{
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
} catch (error) {
    return res.status(401).json({ message: "Invalid token" })
}
}
}
//authorize
const authorizeInstructor =(req,res,next)=>{
 const role=req.user.role
 if(role==="instructor")
    {
        next()
    } 
    else
        res.status(403).json({message:"Not Allowed"})
}

export {protect,authorizeInstructor}
