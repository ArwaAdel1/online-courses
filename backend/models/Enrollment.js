import mongoose from "mongoose";
const enrollmentSchema=new mongoose.Schema({
student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"}

},{timestamps:true});

const Enrollment=mongoose.model("Enrollment",enrollmentSchema);
export default Enrollment;
