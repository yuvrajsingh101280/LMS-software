import Stripe from "stripe"
import Purchase from "../models/purchase.js";
import User from "../models/user.js";
import Course from "../models/Course.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (req, res) => {

    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const payementIntentId = payementIntent.id



            const session = await stripeInstance.checkout.sessions.list({


                payement_intent: payementIntentId

            })
            const { purchaseId } = session.data[0].metadata

            const purchaseData = await Purchase.findById(purchaseId)
            const userData = await User.findyById(purchaseData.userId)
            const courseData = await Course.findById(purchaseData.courseId.toString())



            courseData.enrolledStudents.push(userData)
            await courseData.save()
            userData.enrolledCourses.push(courseData._id)
            await userData.save()

            purchaseData.status = "completed"
            await purchaseData.save()

            break;
        }
        case 'payment_intent.payement_failed':
            {
                const paymentIntent = event.data.object;
                const payementIntentId = payementIntent.id



                const session = await stripeInstance.checkout.sessions.list({


                    payement_intent: payementIntentId

                })
                const { purchaseId } = session.data[0].metadata
                const purchaseData = await Purchase.findById(purchaseId)
                purchaseData.status = "failed"
                await purchaseData.save()
                break;
            }
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });

}