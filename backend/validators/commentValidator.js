import Joi from "joi"
const commentSchema=Joi.object({
    text:Joi.string().required(),
})
//middleware for comments
const validateComment=(req,res,next)=>{
    const { error }=commentSchema.validate(req.body)
    if(error)
          res.status(400).json({ message: error.details[0].message })
    else
        next()
}
export {validateComment}
