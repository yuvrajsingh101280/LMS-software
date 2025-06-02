import express from "express"
const router = express.Router()
import protectRoutue from "../middlewares/protectRoute.js"
import { purchaseCourse, userData, userEnrolledCourses } from "../controllers/userController.js"
router.get("/data", protectRoutue, userData)
router.get("/enrolled-courses", protectRoutue, userEnrolledCourses)
router.post("/purchase", protectRoutue, purchaseCourse)

export default router