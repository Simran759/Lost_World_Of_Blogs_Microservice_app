import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.js';
import {createClient} from "redis"
import { startCacheConsumer } from './utils/consumer.js';
import cors from "cors";

dotenv.config();
const app=express();
export const redisClient = createClient({
    url:process.env.REDIS_URL,
});
redisClient.connect().then(()=>{
    console.log("connected to redis")
}).catch(console.error);

startCacheConsumer();
// await client.set('foo', 'bar');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api/v1',blogRoutes);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Blog service is running on port ${PORT}`);
})