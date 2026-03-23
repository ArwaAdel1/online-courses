import Course from "../models/Course.js"
//create courses
const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body
        const instructorId = req.user.id
        const course = await Course.create({
            title, description, instructor: instructorId

        })
        res.status(201).json({ message: "Course created successfully", course })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json({ message: "All courses fetched successfully", courses })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get course by id 
const getCourseByID = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        if (course)
            res.status(200).json({ message: "Course Fetched successfully ", course })
        else
            res.status(404).json({ message: "Course Not Found" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update course 
const updateCourse = async (req, res) => {
    try {
        const {title, description} = req.body
        const update = await Course.updateOne(
            { _id: req.params.id },
            { $set: { title, description } }
        )
        if (update.matchedCount === 0)
            res.status(404).json({ message: "Course Not Found" })
        else
            res.status(200).json({ message: "Course Updated Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete course
const deleteCourse=async (req,res)=>{
    try{
      const deleteCourse=await Course.deleteOne(
        {_id:req.params.id}

      )
      if(deleteCourse.deletedCount===0)
           res.status(404).json({ message: "Course Not Found" })
        else
              res.status(200).json({ message: "Course Deleted Successfully" }) 

    }
    catch(error)
    {
    res.status(500).json({ message: error.message })
    }

}


export { createCourse, getCourses, getCourseByID ,updateCourse,deleteCourse}
