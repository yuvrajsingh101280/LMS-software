import { clerkClient } from "@clerk/express"




// update role to educator
export const updateRoleToEducator = async (req, res) => {

    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {

            publicMetadata: {
                role: "educator",
            }
        })

        return res.status(200).json({ success: true, message: "You can publish a course now" })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ success: false, message: error.message })

    }


}