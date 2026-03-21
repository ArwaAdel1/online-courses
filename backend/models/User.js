import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
const userSchema=new mongoose.Schema({
 name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password:{type:String,required:true},
role: { type: String, enum: ["student", "instructor"], default: "student" }

},
{timestamps:true});

//pre save for hashing password
userSchema.pre("save",async function(next){
    //salt hash => من غيره لو شخصين عندهم نفس الباسورد هيكون عندهم نفس الهاش و ده غلط
    if(!this.isModified("password"))return next();
    //generate salt 
    const salt =await bcryptjs.genSalt(10);
    this.password=await bcryptjs.hash(this.password,salt);
});
const User=mongoose.model("User",userSchema);
export default User;