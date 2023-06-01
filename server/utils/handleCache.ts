const Redis = require('redis');
const EXP_TIME = 3000;

const redisClient = Redis.createClient({
    url: process.env.REDIS_URL,
});

const getOrSetCache = async (key: string, callback: Function) => {
    try {
        return new Promise((resolve, reject) => {
            redisClient.get(key, async (err: any, data: any) => {
                try {
                    if (err) return reject(err);
                    if (data !== null) return resolve(JSON.parse(data));

                    const freshData = await callback();
                    redisClient.setex(key, EXP_TIME, JSON.stringify(freshData));
                    console.log('cache set');

                    resolve(freshData);
                } catch (err: any) {
                    reject(err);
                }
            });
        });
    } catch (err: any) {
        return err.message;

    }
}

module.exports = getOrSetCache;