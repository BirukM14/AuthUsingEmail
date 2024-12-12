import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        console.log("mongo uri :",process.env.MONGO_URI)
        console.log('dg')

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`);
        
    }catch(error){
        console.log("Error connection to MongoDB:",error.message)
        process.exit(1);

    }
}