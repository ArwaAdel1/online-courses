import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import router from "./routes/auth.js"
import courseRouter from "./routes/course.js"

dotenv.config();
connectDB();
const app=express();
app.use(express.json())
app.use("/api/auth",router)
app.use("/api/courses", courseRouter)

//listen on port 
app.listen(process.env.PORT,()=>{
 console.log(`Server running on port ${process.env.PORT} ✅`)
});



