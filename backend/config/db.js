import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:process.env.DB_NAME,
        })
            console.log("Connected to mongo")
        
    }catch(err){
        console.log("Not Connected",err.message)
    }
}

