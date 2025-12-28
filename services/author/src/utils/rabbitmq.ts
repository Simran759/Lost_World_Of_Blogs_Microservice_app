import amqp from "amqplib";

let channel:amqp.Channel;

export const connectRabbitMQ=async()=>{
    try{
        const connection=await amqp.connect(
            {
                protocol:"amqp",
                hostname:"localhost",
                port:5672,
                username:"admin",
                password:"admin123"
            }
        );
        channel=await connection.createChannel();
        console.log("✅ Connected to RabbitMQ");
    }catch(err)
    {
        console.error("❌ Error connecting to RabbitMQ",err);
    }


}


export const publishToQueue=async(queueName:string,message:any)=>{
    if(!channel)
    {
        console.error("RabbitMQ channel is not established");
        return;
    }
    await channel.assertQueue(queueName,{durable:true});
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{
        persistent:true,
    });
}

export const invalidateChacheJob=async(chacheKeys:string[])=>{
    try{
        const message={
            action:"invalidateCache",
            keys:chacheKeys,
        };
        await publishToQueue("chache-invalidation",message);
        console.log("Cache invalidation job published to RabbitMQ");
    }
    catch(err)
    {
        console.error("Error publishing cache invalidation job on rabbitmq",err);
    }
};