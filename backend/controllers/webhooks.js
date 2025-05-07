import { Webhook } from "svix"
import User from "../models/user.js"

// Api controller function to manage user with database

export const clerkWebhook = async (req, res) => {


    try {

        const payload = JSON.stringify(req.body)
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
                const user = new User(userData)
                await user.save()

                console.log("User created ", userData)
                return res.status(200).json({ success: true, message: "user created" })
                break;

            }

            case "user.updated": {

                const userData = {

                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,


                }
                await User.findByIdAndUpdate(data.id, userData)
                console.log("user updated", userData)
                return res.status(200).json({ succes: true, message: "User updated successfully" })
                break;
            }
            case "user.deleted": {

                await User.findByIdAndDelete(data.id)
                console.log("User deleted", data.id)
                return res.status(200).json({ success: true, message: "User deleted" })
                break;



            }

            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });


    }



}

