import Course from "../models/Course.js"
import Enrollment from "../models/Enrollment.js"

// enroll in course
const enrollCourse = async (req, res) => {
    try {
        const studentId = req.user.id
        const courseId = req.params.courseId

        const course = await Course.findById(courseId)
        if (!course)
            return res.status(404).json({ message: "Course Not Found" })

        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId })
        if (existingEnrollment)
            return res.status(400).json({ message: "Already enrolled in this course" })

        const enrollment = await Enrollment.create({ student: studentId, course: courseId })
        res.status(201).json({ message: "Enrolled successfully", enrollment })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get my enrollments
const getMyEnrollments = async (req, res) => {
    try {
        const studentId = req.user.id
        const enrollments = await Enrollment.find({ student: studentId }).populate("course")
        res.status(200).json({ message: "Enrollments fetched successfully", enrollments })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { enrollCourse, getMyEnrollments }