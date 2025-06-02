import express from "express"
import { login, logout, signup } from "../controllers/authController.js"
import upload from "../config/multer.js"
import protectRoutue from "../middlewares/protectRoute.js"


const router = express.Router()
router.post("/signup", upload.single("image"), signup)
router.post("/login", login)
router.post("/logout", logout)



export default router