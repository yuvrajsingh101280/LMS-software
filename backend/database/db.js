import mongoose from "mongoose";

const connectToDatabase = async () => {
    const MONGO_URI = process.env.MONGO_URL;
    if (!MONGO_URI) {
        throw new Error("MONGO_URL is not defined in environment variables");
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectToDatabase;
