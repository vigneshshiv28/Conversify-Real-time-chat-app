import express from "express";
import http from 'http';
import {Server} from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import authRoute from './router/auth.js';
import dotenv from 'dotenv';
import { sessionConfig, wrap, corsConfig} from "./controllers/sessionConfig.js";
import {authorizeUser, initalizeUser, addFriend, onDisconnect} from "./controllers/socketControllers.js";


const app = express();
const server  = http.createServer(app);
const io = new Server(server,{
  cors:corsConfig
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cors({corsConfig}));
app.use(sessionConfig)

app.use('/api/auth',authRoute);

app.get('/',(req,res)=>{
  res.send('Server is ready');
})

io.use(wrap(sessionConfig));
io.use(authorizeUser);
io.use(initalizeUser);

io.on('connection',(socket)=>{
  console.log(socket.id);
  console.log(`User connected with Socket ID: ${socket.user.socket_id}`);
  console.log(socket.request.session.user.username);

  io.on("addRequest",(friendName,cb)=>{
    addFriend(socket,friendName,cb);
  });

  io.on('disconnect',() => onDisconnect(socket));
})

const PORT = 3001;

server.listen(PORT,(error)=>{
  if(error){
    console.log('Error starting server');
  }
  console.log(`Server started on port ${PORT}`);
})
