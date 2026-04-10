import Joi from "joi"

const lessonSchema=Joi.object({
    title:Joi.string().required(),
    content:Joi.string().required()
})
//middleware for lessons
const validateLesson=(req,res,next)=>{
    const { error }=lessonSchema.validate(req.body)
    if(error)
          res.status(400).json({ message: error.details[0].message })
    else
        next()
}
export {validateLesson}
