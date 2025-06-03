import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/db.js";
import connectCloudinary from "./config/cloudinary.js";

import educatorRouter from "./routes/educatorRoute.js";
import courseRouter from "./routes/courseRoute.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/webhook.js";

dotenv.config();

const app = express();

// Connect to database and cloudinary
await connectToDatabase();
await connectCloudinary();

// Stripe webhook route - must be before express.json()
app.post("/stripe", express.raw({ type: 'application/json' }), stripeWebhooks);

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// app.use(express.json()); // after /stripe
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/api/auth", express.json(), authRouter);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);

// Optional: Error handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Server listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;
