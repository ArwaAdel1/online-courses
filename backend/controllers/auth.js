import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
//register function
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            await User.create({ name, email, password, role })
            res.status(201).json({ message: "User created successfully" })
        }
        else
            return res.status(400).json({ message: "Email already exists" })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // 1. دوري على اليوزر
        const user = await User.findOne({ email })

        // 2. لو مش موجود
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // 3. قارني الباسورد
        const isMatch = await bcryptjs.compare(password, user.password)

        // 4. لو الباسورد غلط
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        //token  
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.status(200).json({ message: "Login successful", token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { register, login }
