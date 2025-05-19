import { clerkClient } from "@clerk/express"
import Course from "../models/Course.js"
import { v2 as cloudinary } from "cloudinary"
// update role to educator
export const updateRoleToEducator = async (req, res) => {

    try {
        const userId = req.auth?.userId
        console.log(userId)

        await clerkClient.users.updateUserMetadata(userId, {

            publicMetadata: {
                role: "educator",
            }
        })

        return res.status(200).json({ success: true, message: "You can publish a course now" })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ success: false, message: error.message })

    }


}
// add a new course
export const addCourse = async (req, res) => {
    try {
        const educatorId = req.user.userId;
        const imageFile = req.file;

        // 🔧 FIXED: No need for JSON.parse, just use req.body directly
        const parsedCourseData = {
            ...req.body,
            educator: educatorId,
        };

        // 🔧 FIXED: Upload image BEFORE creating the course
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        // 🔧 FIXED: Add image URL in course creation
        const newCourse = await Course.create({
            ...parsedCourseData,
            courseThumbnail: imageUpload.secure_url,
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        // 🔧 FIXED: Typo in "error.message"
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



