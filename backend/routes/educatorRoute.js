import express from "express"
import { addCourse, getEducatorCourses, updateRoleToEducator } from "../controllers/educatorControlle.js"
import upload from "../config/multer.js"
import { protectEducator } from "../middlewares/authMiddleware.js"

const educatorRouter = express.Router()

educatorRouter.get("/update-role", updateRoleToEducator)
educatorRouter.post("/add-course", upload.single("image"), protectEducator, addCourse)
educatorRouter.get("/courses", protectEducator, getEducatorCourses)
export default educatorRouter