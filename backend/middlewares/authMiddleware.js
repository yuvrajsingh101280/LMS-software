import User from "../models/user.js"


// Middleware {protecte educator routes}



export const protectEducator = async (req, res, next) => {


    try {
        const userId = req.user._id
        const user = await User.findById(userId)

        if (!user) {

            return res.status(400).json({ success: false, message: "User not found" })

        }

        if (user.role !== "educator") {

            return res.json({ success: false, message: "Unauthorised Access" })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }



}