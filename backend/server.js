import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import router from "./routes/auth.js"
import courseRouter from "./routes/course.js"
import enrollmentRouter from "./routes/enrollment.js"

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use(express.json())
app.use("/api/auth", router)
app.use("/api/courses", courseRouter)
app.use("/api/enrollments", enrollmentRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} ✅`)
});