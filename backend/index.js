import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDatabase from "./database/db.js";
import { clerkWebhook } from "./controllers/webhooks.js";
import bodyParser from "body-parser";
dotenv.config()

// app instance 
const app = express();
// connect to database
connectToDatabase()

// middlewares
// app.use(express.json())
app.use(cors())
// routes
app.post("/clerk", bodyParser.raw({ type: "*/*" }), clerkWebhook)

app.get("/", (req, res) => {

    res.send("Api is working ")

})





// port
const port = process.env.PORT
app.listen(port, () => {


    console.log(`server started at http://localhost:${port}`)


})


