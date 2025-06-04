
// user enrolled coursees with lecture link;s

import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/purchase.js";
import User from "../models/user.js";
import { courseProgress } from "../models/courseProgress.js";
export const userData = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }


}


export const userEnrolledCourses = async (req, res) => {

    try {

        const userId = req.user._id

        const userData = await User.findById(userId).populate("enrolledCourses")
        res.status(200).json({ success: true, enrolledCourses: userData.enrolledCourses })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error })


    }


}

export const purchaseCourse = async (req, res) => {

    try {


        const { courseId } = req.body
        const { origin } = req.headers

        const userId = req.user._id

        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)


        if (!userData || !courseData) {

            return res.status(400).json({ success: false, message: "Data not found" })

        }

        const purchaseData = {


            courseId: courseData._id,
            userId,

            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)


        }
        const newPurchase = await Purchase.create(purchaseData)
        // stripe payement gateway initialise
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()

        // creating line items for stripe

        const line_items = [{


            price_data: {
                currency,
                product_data: {


                    name: courseData.courseTitle


                },
                unit_amount: Math.floor(newPurchase.amount) * 100

            },
            quantity: 1



        }]
        // payement session
        const session = await stripeInstance.checkout.sessions.create({


            success_url: `${origin}/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: "payment",
            metadata: {

                purchaseId: newPurchase._id.toString()

            }

        })

        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}
export const updateCourseProgress = async (req, res) => {


    try {
        const userId = req.user._id

        const { courseId, lectureId } = req.body
        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        const progressData = await courseProgress.findOne({ userId, courseId })
        if (progressData) {


            if (progressData.lectureCompleted.includes(lectureId)) {

                return res.json({ success: true, message: "Lecture Already Completed" })


            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()

        } else {

            await courseProgress.create({

                userId,
                courseId,
                lectureCompleted: [lectureId]


            })



        }
        res.json({ success: true, message: "progress Updated" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}



// get user course progress
export const getUserCourseProgress = async (req, res) => {



    try {
        const userId = req.user._id

        const { courseId } = req.body


        const progressData = await courseProgress.findOne({ userId, courseId })


        res.json({ success: true, progressData })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

// Add User Rating to course



export const addUserRating = async (req, res) => {

    const userId = req.user._id
    const { courseId, rating } = req.body
    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {

        return res.json({ success: false, message: "Invalid Details" })


    }
    try {


        const course = await Course.findById(courseId)
        if (!course) {
            return res.json({ success: false, message: "course not found" })
        }
        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {


            return res.json({ success: false, message: "user has not purchase this course" })
        }
        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)

        if (existingRatingIndex > -1) {


            course.courseRatings[existingRatingIndex].rating = rating


        } else {

            course.courseRatings.push({ userId, rating })


        }
        await course.save()
        res.json({ success: true, message: "Rating added" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }


}