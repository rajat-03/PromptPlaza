import mongoose from "mongoose";

let isConnected = false; // track the connection

const connectDB = async () =>{

    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("Already connected to MongoDB!!")
        return
    }

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        isConnected = true
        return new Response("MongoDB Connected!!", { status: 200 })
    } catch (error) {
        console.log("Error in connecting MongoDB", error)
        process.exit(1)
    }
}

export default connectDB