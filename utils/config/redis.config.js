import redis from 'redis';
const client = redis.createClient({
    url: 'redis://localhost:6379'
});


client.on('error',err=>console.log(err))

client.connect();

export default client;