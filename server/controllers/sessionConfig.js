import redisClient from "../redis.js";
import session from "express-session";
import RedisStore from "connect-redis";
import dotenv from 'dotenv';

dotenv.config();  


const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    credentials: true,
    name: "hehe",
    store: new RedisStore({ client: redisClient}),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }
  });

const wrap = (expressMiddleware) => (socket, next) => 
    expressMiddleware(socket.request,socket.request.session || {}, next);

const corsConfig = {
    origin: '*',
    credentials: true,
}

export  {sessionConfig, wrap, corsConfig};