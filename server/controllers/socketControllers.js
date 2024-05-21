import redisClient from "../redis.js";
  
function authorizeUser(socket, next){
    if( !socket.request.session || !socket.request.session.user){
        console.log("Unauthorized Access");
        next(new Error("Unauthorized"));
    }
    else{
        console.log("Authorized");
        next();
    }
}

async function initalizeUser(socket,next){
    socket.user = {...socket.request.session.user};
    socket.join(socket.user.socket_id);
    await redisClient.hset(
        `userId:${socket.user.username}`,
        'socket_id',
        socket.user.socket_id,
        'connected',
        true
    );

    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    console.log(friendList);
    
    
    const friendRooms = await parseFriendList.map(friend => friend.socket_id);
    if(friendRooms.length > 0){
        socket.to(friendRooms).emit('friendConnected',true,socket.user.username);
    }
    socket.emit('friends',friendList)

    const msgQuery = redisClient.lrange(
        `chat:${socket.user.socket_id}`,
        0,
        -1
    );

    const messages = (await msgQuery).map(msgStr =>{
        const parsedStr = msgStr.split(".");
        return {to: parsedStr[0], from: parsedStr[1], content:parsedStr[2]} 
    })

    if(messages && messages.length > 0){
        socket.emit("messages",messages);
    }
    console.log("User Initialized");
    next();
}

async function addFriend(socket,friendName,cb){
    if(friendName == socket.user.username){
        cb({done: false,error:"You cannot add yourself as a friend"});
    }

    const friend = await redisClient.hgetall(`userId${friendName}`);
    
    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    )

    if(!friend){
        cb({done: false,error:"User does not exist"});
    }

    if(currentFriendList && currentFriendList.includes(friendName)){
        cb({done: false,error:"User is already a friend"});
    }

    await redisClient.lpush(`friends:${socket.user.username}`,[friendName,friendName.socket_id].join("."));
    const addedFriend = {
        username: friendName,
        userId: friendName.socket_id,
        connected: friend.connected,
    }
    cb({done:true, addFriend: addedFriend});
}      

async function onDisconnect(socket){
    await redisClient.hset(
        `userId:${socket.user.username}`,
        'connected',
        false
    );
    const friendList = redisClient.lrange(`friends:${socket.user.username}`,0,-1);
    const friendRooms = await parseFriendList(friendList).then(friends => 
        friends.map(friend => friend.userId)
    );
    socket.to(friendRooms).emit('friendDisconnect',false,socket.user.username);
    console.log("User Disconnected");
}

async function parseFriendList(friendList){
    const parsedList = [];
    for(let friend of friendList){
        const [username,socket_id] = friend.split(".");
        const friendConnected = await redisClient.hget(`userId:${username}`,"connected");
        parsedList.push({username: username, userId: socket_id, connected:friendConnected});
    }
    return parsedList;
}

export  {authorizeUser, initalizeUser,addFriend ,onDisconnect};