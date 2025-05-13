import { clerkClient } from "@clerk/express"


// Middleware {protecte educator routes}



export const protectEducator = async (req, res, next) => {


    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role != "educator") {

            return res.json({ success: false, message: "Unauthorised Access" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }



}