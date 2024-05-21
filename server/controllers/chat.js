import redisClient from "../redis.js";

async function chat(socket,message){
    message.from = socket.user.socket_id;
    const messageString = [
        message.to,
        message.from,
        message.content,
    ].join(".");

    await redisClient.lpush(`chat:${message.to}`,messageString);
    await redisClient.lpush(`chat:${message.from}`,messageString);

    socket.to(message.to).emit("chat",parsedMessage);
}