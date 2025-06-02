
import Course from "../models/Course.js"
import { v2 as cloudinary } from "cloudinary"
import Purchase from "../models/purchase.js"
import User from "../models/user.js"



// update role to educator
export const updateRoleToEducator = async (req, res) => {

    try {
        const user = req.user

        if (!user) {

            return res.status(400).json({ success: false, message: "user not found" })
        }

        await User.findByIdAndUpdate(user._id, { role: "educator" })

        return res.status(200).json({ success: true, message: "You can publish a course now", user: { ...user._doc, password: undefined } })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ success: false, message: error.message })

    }


}

// add a new course

export const addCourse = async (req, res) => {
    try {
        const educatorId = req.user._id
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(401).json({ success: false, message: "Thumbnail is not attached" });
        }

        const courseDataString = req.body.courseData;
        const parsedCourseData = JSON.parse(courseDataString);
        parsedCourseData.educator = educatorId;

        const newCourse = await Course.create(parsedCourseData);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();

        console.log("Course added successfully", newCourse);
        return res.status(200).json({ success: true, message: "Course Added" });
    } catch (error) {
        console.log("Error in adding course", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};



// get educator courses

export const getEducatorCourses = async (req, res) => {


    try {
        const educator = req.user._id



        const courses = await Course.find({ educator })


        res.json({ success: true, courses })





    } catch (error) {
        console.log("Error in getting courses ", error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })

    }




}



// get educator dashboard data



export const educatorDashboardData = async (req, res) => {


    try {


        const educator = req.user._id
        const courses = await Course.find({ educator })
        const totalCourses = courses.length


        const courseIds = courses.map((course) => course._id)

        // calculatig total earning

        const purchases = await Purchase.find({

            courseId: { $in: courseIds },
            status: "completed"


        })

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)
        // collect unique enroll student id 
        const enrolledStudentsData = []


        for (const course of courses) {

            const students = await User.find({

                _id: { $in: course.enrolledStudents },



            }, "name imageUrl")

            students.forEach(student =>

                enrolledStudentsData.push({


                    courseTitle: course.courseTitle,
                    student


                })

            )





        }



        res.json({
            success: true, dashboardData: {

                totalEarnings,
                enrolledStudentsData,
                totalCourses

            }
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })

    }





}


// get enrolled student data with purchase data
export const getEnrolledStuedntData = async (req, res) => {


    try {




        const educator = req.user._id

        const courses = await Course.find({ educator })

        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: "completed"



        }).populate("userId", "name imageUrl").populate("courseId", "courseTitle")
        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt



        }))
        res.json({ success: true, enrolledStudents })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }




}


