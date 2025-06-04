import express from "express"
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStuedntData, updateRoleToEducator } from "../controllers/educatorControlle.js"
import upload from "../config/multer.js"
import { protectEducator } from "../middlewares/authMiddleware.js"
import protectRoutue from "../middlewares/protectRoute.js"

const educatorRouter = express.Router()

educatorRouter.get("/update-role", protectRoutue, updateRoleToEducator)
educatorRouter.post("/add-course", protectRoutue, protectEducator, upload.single("image"), addCourse)
educatorRouter.get("/courses", protectRoutue, protectEducator, getEducatorCourses)
educatorRouter.get("/dashboard", protectRoutue, protectEducator, educatorDashboardData)
educatorRouter.get("/enrolled-students", protectRoutue, protectEducator, getEnrolledStuedntData)
export default educatorRouter