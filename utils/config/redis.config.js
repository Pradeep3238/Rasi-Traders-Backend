import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
// Get the Redis URL from the environment variable
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient({
    url: redisUrl,
    password:process.env.REDIS_PASSWORD
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

export default client;
