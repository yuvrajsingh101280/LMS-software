import mongoose from "mongoose";
const connectToDatabase = async () => {
    const url = process.env.MONGO_URL
    try {

        mongoose.connection.on("connected", () => console.log("Database connected"))
        await mongoose.connect(url)

    } catch (error) {
        console.log(error)
    }


}
export default connectToDatabase;