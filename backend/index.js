import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDatabase from "./database/db.js";
dotenv.config()

// app instance 
const app = express();
// connect to database
connectToDatabase()

// middlewares
app.use(express.json())
app.use(cors())
// routes
app.get("/", (req, res) => {

    res.send("Hello world")

})





// port
const port = process.env.PORT
app.listen(port, () => {


    console.log(`server started at http://localhost:${port}`)


})


