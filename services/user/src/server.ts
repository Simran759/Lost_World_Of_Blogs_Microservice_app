import express from 'express';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
// console.log(process.env.Cloud_Api_Key);
import cors from 'cors';
dotenv.config();    
const app=express();
const port=process.env.PORT || 5000;
connectDB();
 cloudinary.config({ 
        cloud_name: process.env.Cloud_Name, 
        api_key: process.env.Cloud_Api_Key, 
        api_secret: process.env.Cloud_Api_Secret,
 });
//json read from request body
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",userRoutes);
app.listen(port,()=>{
    console.log(`User service is running on port ${port}`);
});