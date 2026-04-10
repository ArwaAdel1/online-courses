import Course from "../models/Course.js"
import Lesson from "../models/Lesson.js"

//add lessons
const createLesson = async (req, res) => {
    try {
        const { title, content } = req.body
        const courseId = req.params.courseId
        const lesson = await Lesson.create({
            title, content, course: courseId
        })
        //array of lessons
        await Course.findByIdAndUpdate(courseId, {
            $push: { lessons: lesson._id }
        })
        res.status(201).json({ message: "Lesson created successfully", lesson })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//get lesson
const getLessons = async (req, res) => {
    try {
        const courseId = req.params.courseId
        //filter with course id
        const lessons = await Lesson.find({ course: courseId })
        res.status(200).json({ message: "All Lessons fetched successfully", lessons })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//update lessons 
const updateLesson = async (req, res) => {
    try {
        const { title, content } = req.body
        const update = await Lesson.updateOne(
            { _id: req.params.id },
            { $set: { title, content } })
        if (update.matchedCount === 0)
            res.status(404).json({ message: "Lesson Not Found" })
        else
            res.status(200).json({ message: "Lesson Updated Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//delete lesson 
const deleteLesson = async (req, res) => {
    try {
        const deletelesson = await Lesson.deleteOne({_id:req.params.id})
        if (deletelesson.deletedCount === 0)
            res.status(404).json({ message: "Lesson Not Found" })
        else
            res.status(200).json({ message: "Lesson Deleted Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createLesson, getLessons, updateLesson,deleteLesson }

