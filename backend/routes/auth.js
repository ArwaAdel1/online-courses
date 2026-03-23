import { register,login } from "../controllers/auth.js";
import { validateRegister,validatorLogin } from "../validators/authValidator.js"

import express from "express"
const router = express.Router()
router.post("/register",validateRegister, register)
router.post("/login",validatorLogin, login)

export default router
