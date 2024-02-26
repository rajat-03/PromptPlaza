import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Connected to MongoDb!!")
    } catch (error) {
        console.log("Error in connecting MongoDB", error)
        process.exit(1)
    }
}

export default connectDB