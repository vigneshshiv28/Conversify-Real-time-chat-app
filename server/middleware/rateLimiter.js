import redisClient from "../redis.js";

async function  rateLimiter(req, res, next) {
  // Implemented rate limiting logic here
  const ip = req.ip;
  const response = await redisClient.multi().incr(ip).expire(ip,60).exec();
  if(response[0][1] > 60){
    res.status(429).json({loggedIn: false,message: "Too many requests! Please try again later."});
  }
  else next();
  console.log(response);  
  
}

export default rateLimiter;