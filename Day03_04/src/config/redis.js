const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

/* Prevent Node from crashing on Redis errors */
// redisClient.on("error", (err) => {
//   console.error("Redis error:", err.message);
// });

// redisClient.on("connect", () => {
//   console.log("Redis connected");
// });

module.exports = redisClient;





// const { createClient } =require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host:process.env.REDIS_HOST,
//         port: Number(process.env.REDIS_PORT),
//         tls:true,
//     },
// });

// module.exports=redisClient

// const { createClient } = require("redis");

// const redisClient = createClient({
//   username: "default",
//   password: process.env.REDIS_PASS,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT),
//   },
// });

// redisClient.on("connect", () => {
//   console.log("Redis connected");
// });

// redisClient.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// module.exports = redisClient;
