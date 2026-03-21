import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    text:{type:String,required:true},
    student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    lesson:{type:mongoose.Schema.Types.ObjectId,ref:"Lesson"}


},{timestamps:true}
);

const Comment=mongoose.model("Comment",commentSchema);
export default Comment;
