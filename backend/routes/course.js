import  {createCourse,getCourses,getCourseByID,updateCourse,deleteCourse} from "../controllers/course.js"
import {protect,authorizeInstructor} from "../middleware/auth.js"
import express from "express"

const router=express.Router()
router.post("/", protect,authorizeInstructor, createCourse)
router.get("/",getCourses)
router.get("/:id",getCourseByID)
router.put("/:id",protect,authorizeInstructor,updateCourse)
router.delete("/:id",protect, authorizeInstructor,deleteCourse)

export default router

