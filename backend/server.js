import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"

dotenv.config();
connectDB();
const app=express();
app.use(express.json())

//listen on port 
app.listen(process.env.PORT,()=>{
 console.log(`Server running on port ${process.env.PORT} ✅`)
});



