import mongoose from "mongoose"
const userSchema = new mongoose.Schema({



    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {

        type: String,
        enum: ["educator", "student"],
        default: "student"


    },



    profilePic: { type: String, required: true },

    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",

    }]



}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User