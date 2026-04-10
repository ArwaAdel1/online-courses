import Comment from "../models/Comment.js"

//add comment
const createComment = async (req, res) => {
    try {
        const { text } = req.body
        const lesson = req.params.lessonId
        const student = req.user.id
        const comment = await Comment.create({
            text, lesson, student
        })
        res.status(201).json({ message: "Comment created successfully", comment })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get comments
const getComments = async (req, res) => {
    try {
        const lessonId = req.params.lessonId
        const comments = await Comment.find({ lesson: lessonId })
        res.status(200).json({ message: "All Comments fetched successfully", comments })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update comment
const updateComment = async (req, res) => {
    try {
        const { text } = req.body
        const update = await Comment.updateOne(
            { _id: req.params.id },
            { $set: { text } }
        )
        if (update.matchedCount === 0)
            res.status(404).json({ message: "Comment Not Found" })
        else
            res.status(200).json({ message: "Comment Updated Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete comment
const deleteComment = async (req, res) => {
    try {
        const deleteComment = await Comment.deleteOne({ _id: req.params.id })
        if (deleteComment.deletedCount === 0)
            res.status(404).json({ message: "Comment Not Found" })
        else
            res.status(200).json({ message: "Comment Deleted Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createComment, getComments, updateComment, deleteComment }
