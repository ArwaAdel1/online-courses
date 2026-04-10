import  {createCourse,getCourses,getCourseByID,updateCourse,deleteCourse} from "../controllers/course.js"
import {protect,authorizeInstructor} from "../middleware/auth.js"
import { validateCourse } from "../validators/courseValidator.js"
import  { createLesson, getLessons, updateLesson,deleteLesson } from "../controllers/lesson.js"
import { createComment, getComments, updateComment, deleteComment } from "../controllers/comment.js"
import {validateLesson} from "../validators/lessonValidator.js"
import {validateComment} from "../validators/commentValidator.js"
import express from "express"

const router=express.Router()

//routes for courses
router.post("/", protect, authorizeInstructor, validateCourse, createCourse)
router.get("/", getCourses)
router.get("/:id", getCourseByID)
router.put("/:id", protect, authorizeInstructor, validateCourse, updateCourse)
router.delete("/:id", protect, authorizeInstructor, deleteCourse)

//routes for lessons
router.post("/:courseId/lessons", protect, authorizeInstructor,validateLesson, createLesson)
router.get("/:courseId/lessons", getLessons)
router.put("/:courseId/lessons/:id", protect, authorizeInstructor,validateLesson, updateLesson)
router.delete("/:courseId/lessons/:id", protect, authorizeInstructor, deleteLesson)

//routes for comments
router.post("/:courseId/lessons/:lessonId/comments", protect,validateComment, createComment)
router.get("/:courseId/lessons/:lessonId/comments", getComments)
router.put("/:courseId/lessons/:lessonId/comments/:id", protect,validateComment, updateComment)
router.delete("/:courseId/lessons/:lessonId/comments/:id", protect, deleteComment)

export default router

