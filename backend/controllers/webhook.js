import Stripe from "stripe";
import dotenv from "dotenv";
import Purchase from "../models/purchase.js";
import User from "../models/user.js";
import Course from "../models/Course.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {

    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );


    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Respond immediately to Stripe to avoid timeout
    response.status(200).json({ received: true });

    // Process webhook event asynchronously
    (async () => {
        const session = event.data.object;

        switch (event.type) {
            case 'checkout.session.completed': {
                try {
                    const { purchaseId } = session.metadata;

                    const purchaseData = await Purchase.findById(purchaseId);
                    if (!purchaseData) {
                        console.warn("Purchase not found for ID:", purchaseId);
                        break;
                    }

                    const userData = await User.findById(purchaseData.userId);
                    const courseData = await Course.findById(purchaseData.courseId);

                    // Prevent duplicate enrollments
                    if (!courseData.enrolledStudents.includes(userData._id)) {
                        courseData.enrolledStudents.push(userData._id);
                        await courseData.save();
                    }

                    if (!userData.enrolledCourses.includes(courseData._id)) {
                        userData.enrolledCourses.push(courseData._id);
                        await userData.save();
                    }

                    purchaseData.status = "completed";
                    await purchaseData.save();

                    console.log("Payment completed: User enrolled and purchase updated.");
                } catch (error) {
                    console.error(" Error in checkout.session.completed:", error.message);
                }
                break;
            }

            case 'checkout.session.expired': {
                try {
                    const { purchaseId } = session.metadata;

                    const purchaseData = await Purchase.findById(purchaseId);
                    if (purchaseData) {
                        purchaseData.status = "failed";
                        await purchaseData.save();
                        console.log("Payment failed: Purchase marked as failed.");
                    } else {
                        console.warn("Expired session: Purchase not found for ID:", purchaseId);
                    }
                } catch (error) {
                    console.error(" Error in checkout.session.expired:", error.message);
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    })();
};
