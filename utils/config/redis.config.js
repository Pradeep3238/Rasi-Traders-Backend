import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });


const client = createClient({
    password:process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-14503.c261.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 14503
    }
});
client.on('error', err => console.log('Redis Client Error', err));

client.connect();

export default client;
