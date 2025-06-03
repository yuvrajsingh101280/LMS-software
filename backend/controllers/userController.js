
// user enrolled coursees with lecture link;s

import Stripe from "stripe";
import Course from "../models/Course.js";
import Purchase from "../models/purchase.js";
import User from "../models/user.js";
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


            success_url: `${origin}/loading/my-enrollments`,
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
