import User from "../models/user.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
// import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {


        const { name, email, password } = req.body
        const image = req.file
        // validation


        if (!email || !password || !name) {

            return res.status(400).json({ success: false, messsage: "All fields are required" })
        }
        if (!image) {
            return res.status(400).json({ success: false, message: "Profile picture is required" });
        }

        // check if the user already exist

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exist" })

        }

        // check the valid email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })

        }
        // check the password
        if (password.length < 6) {

            return res.status(400).json({ success: false, message: "Password should have a minimum 6 charater length" })

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const upload = await cloudinary.uploader.upload(image.path)

        const newUser = await User.create({ name, email, password: hashedPassword, profilePic: upload.secure_url })

        await generateTokenAndSetCookie(newUser._id, res)
        res.status(200).json({ success: true, message: "User created", user: { ...newUser._doc, password: undefined } })



    } catch (error) {
        console.log(error)

        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}
export const login = async (req, res) => {
    try {
        // login using email and passowrd
        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({ success: false, message: "All fields are required" })

        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })

        }




        const user = await User.findOne({ email })
        if (!user) {


            return res.status(200).json({ success: false, message: "User not found" })

        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {

            return res.status(400).json({ success: false, message: "Invalid credentials" });


        }



        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            success: true, message: "User logged in ...............", user: {

                ...user._doc, password: undefined


            }
        })
    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "Error in loggin" })

    }


}


export const logout = async (req, res) => {

    try {
        res.clearCookie("token")
        res.status(200).json({ success: true, message: "Logged out" })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "Logged out unsuccessfull" })

    }

}
