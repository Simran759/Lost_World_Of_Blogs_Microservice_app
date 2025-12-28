import mongoose from "mongoose";

const connectDB=async()=>{
    try{
    mongoose.connect(process.env.MONGO_URI as string,{
        dbName:"blog",
    });
    console.log("connected to mongodb");
    }
    catch(err)
    {
        console.log(err);
    }
}
export default connectDB;