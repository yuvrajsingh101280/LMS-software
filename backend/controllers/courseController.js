
import Course from "../models/Course.js";

// Get All Courses

export const getAllCourse = async (req, res) => {

    try {



        const courses = await Course.find({ isPublished: true }).select(["-courseContent", "-enrolledStudents"]).populate("educator")
        res.json({ success: true, courses })




    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server Error" })

    }



}


// get course by id



export const getCourseId = async (req, res) => {

    const { id } = req.params


    try {

        const courseData = await Course.findById(id).populate({ path: "educator" })
        if (!courseData) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const plainCourse = courseData.toObject(); // 🛠️ Convert to plain JS object
        // remove lecture url if isPreview is not free
        plainCourse.courseContent.forEach((chapter) => {

            chapter.chapterContent.forEach(lecture => {

                if (!lecture.isPreviewFree) {


                    lecture.lectureUrl = ""


                }


            })


        })


        res.json({ success: true, courseData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }



}





