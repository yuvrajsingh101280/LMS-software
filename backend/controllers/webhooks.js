import { Webhook } from "svix"
import User from "../models/user.js"

// Api controller function to manage user with database

export const clerkWebhook = async (req, res) => {


    try {

        const payload = req.body
        const headers = {



            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const evt = await webhook.verify(payload, headers)


        const { data, type } = evt

        switch (type) {
            case "user.created": {

                const userData = {

                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,


                }
                await User.create(userData)
                res.json({})
                break;

            }

            case "user.updated": {

                const userData = {

                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,


                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case "user.deleted": {

                await User.findByIdAndDelete(data.id)
                res.json({})
                break;



            }

            default:
                break;
        }


    } catch (error) {

        res.json({ success: false, message: error.message })


    }



}

