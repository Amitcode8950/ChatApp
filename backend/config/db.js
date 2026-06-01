import mongoose from "mongoose"
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    console.log("ConnectDB is MONGODB")
}

export default connectDB 