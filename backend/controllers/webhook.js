import Stripe from "stripe";
import Purchase from "../models/purchase.js";
import User from "../models/user.js";
import Course from "../models/Course.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            try {
                const paymentIntent = event.data.object;

                const paymentIntentId = paymentIntent.id;

                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId
                });

                const { purchaseId } = session.data[0].metadata;

                const purchaseData = await Purchase.findById(purchaseId);
                const userData = await User.findById(purchaseData.userId);
                const courseData = await Course.findById(purchaseData.courseId.toString());

                courseData.enrolledStudents.push(userData._id);
                await courseData.save();

                userData.enrolledCourses.push(courseData._id);
                await userData.save();

                purchaseData.status = "completed";
                await purchaseData.save();

            } catch (error) {
                console.error("Error handling payment success webhook:", error.message);
            }
            break;
        }


        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            });

            const { purchaseId } = session.data[0].metadata;
            const purchaseData = await Purchase.findById(purchaseId);
            purchaseData.status = "failed";
            await purchaseData.save();

            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
