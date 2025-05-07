import express from "express"
import { updateRoleToEducator } from "../controllers/educatorControlle.js"

const educatorRouter = express.Router()

educatorRouter.get("/update-role", updateRoleToEducator)

export default educatorRouter