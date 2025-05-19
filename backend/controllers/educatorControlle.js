import { clerkClient } from "@clerk/express"
import Course from "../models/Course.js"
import { v2 as cloudinary } from "cloudinary"



// update role to educator
export const updateRoleToEducator = async (req, res) => {

    try {
        const userId = req.auth.userId

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


        const CourseData = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId



        if (!imageFile) {

            return res.status(401).json({ success: false, message: "Thumbnail is not attached" })
        }
        const parsedCourseData = await JSON.parse(CourseData)
        parsedCourseData.educator = educatorId


        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()
        console.log("Course added succesfully", newCourse)
        return res.json({ success: true, message: "Course Added " })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.messge })



    }



}



