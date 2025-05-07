import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDatabase from "./database/db.js";
import { clerkWebhook } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoute.js";
import { clerkMiddleware } from "@clerk/express";
dotenv.config()

// app instance 
const app = express();
// connect to database
// await connectToDatabase()

// middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


// routes
app.post("/clerk", clerkWebhook)




app.get("/", (req, res) => {

    res.send("Api is working ")

})

app.use("/api/educator", educatorRouter)



// port
const port = process.env.PORT
const startServer = async () => {
    try {
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
