import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDatabase from "./database/db.js";
import educatorRouter from "./routes/educatorRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import courseRouter from "./routes/courseRoute.js"
import authRouter from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config()

// app instance 
const app = express();
// connect to database
// await connectToDatabase()

// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// routes




app.get("/", (req, res) => {

    res.send("Api is working ")

})

app.use("/api/auth", authRouter)
app.use("/api/educator", educatorRouter)
app.use("/api/course", courseRouter)
// connect to cloudinary



// port
const port = process.env.PORT
const startServer = async () => {
    try {
        // connect to cloudinary

        await connectCloudinary()

        await connectToDatabase(); // Ensures MongoDB connection is live
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err.message);
    }
};

startServer();

export default app;
