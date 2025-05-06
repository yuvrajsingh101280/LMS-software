import mongoose from "mongoose";
const connectToDatabase = async () => {
    const url = process.env.MONGO_URL
    try {
        await mongoose.connect(url)
        console.log("Databse connected successfully")
    } catch (error) {
        console.log(error)
    }


}
export default connectToDatabase;