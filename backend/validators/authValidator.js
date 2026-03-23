import Joi from "joi"
const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required().valid("student", "instructor")

})

//middleware for register
const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body)
    if (error)
        //return first error 
        res.status(400).json({ message: error.details[0].message })
    else
        next()
}
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

//middleware for login
const validatorLogin=(req,res,next)=>{
     const { error } = loginSchema.validate(req.body)
    if (error)
        //return first error 
        res.status(400).json({ message: error.details[0].message })
    else
        next()
}

export { validateRegister,validatorLogin }
