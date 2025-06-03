import express from "express"
const router = express.Router()
import protectRoutue from "../middlewares/protectRoute.js"
import { addUserRating, getUserCourseProgress, purchaseCourse, updateCourseProgress, userData, userEnrolledCourses } from "../controllers/userController.js"
router.get("/data", protectRoutue, userData)
router.get("/enrolled-courses", protectRoutue, userEnrolledCourses)
router.post("/purchase", protectRoutue, purchaseCourse)
router.post("/update-course-progress", protectRoutue, updateCourseProgress)
router.post("/get-course-progress", protectRoutue, getUserCourseProgress)
router.post("/add-rating", protectRoutue, addUserRating)
export default router