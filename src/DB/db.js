import mongoose from "mongoose";

const uri = "mongodb+srv://kaushaltopusa:**********@cluster101.bm6x1.mongodb.net/SocialAppLikeComment?retryWrites=true&w=majority&appName=Cluster101"

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true, // Optional for backward compatibility
            useUnifiedTopology: true, // Optional for backward compatibility
        });
        console.log("MongoDB connected successfully!");
        console.log("--------------------------------------------")
    } catch (error) {
        console.error(`MongoDB connection failed. ERROR: ${error}`)
        process.exit(1)
    }
}