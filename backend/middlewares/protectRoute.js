import jwt from "jsonwebtoken"
import User from "../models/user.js"

const protectRoutue = async (req, res, next) => {


    try {


        const token = req.cookies.token

        if (!token) {

            return res.status(400).json({ success: false, message: "No token found" })

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {

            return res.status(400).json({ success: false, message: "Unauthorized User" })


        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {

            return res.status(400).json({ success: false, message: "User not found" })

        }


        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }



}
export default protectRoutue