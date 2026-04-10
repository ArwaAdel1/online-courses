import Joi from "joi"
const courseSchema=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),

})
//Middleware for courses
const validateCourse=(req,res,next)=>{
    const { error }=courseSchema.validate(req.body)
    if(error)
          res.status(400).json({ message: error.details[0].message })
    else
        next()
}
export {validateCourse}