import { enrollCourse, getMyEnrollments } from "../controllers/enrollment.js"
import { protect } from "../middleware/auth.js"
import express from "express"

const router = express.Router()

router.post("/:courseId", protect, enrollCourse)
router.get("/my-courses", protect, getMyEnrollments)

export default router

