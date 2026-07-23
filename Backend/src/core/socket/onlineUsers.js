const { createClient } = require("redis");

// In-memory fallback map: userId -> Set of socketIds
const memoryOnlineUsers = new Map();
let redisClient = null;
let useRedis = false;

// Attempt to initialize Redis client if REDIS_URL is provided
if (process.env.REDIS_URL) {
    try {
        redisClient = createClient({ url: process.env.REDIS_URL });
        redisClient.on("error", (err) => {
            console.error("Redis Socket Client Error:", err);
        });
        redisClient.connect().then(() => {
            console.log("Connected to Redis successfully for Socket.IO");
            useRedis = true;
        }).catch((err) => {
            console.warn("Failed to connect to Redis, falling back to in-memory store.", err);
        });
    } catch (e) {
        console.warn("Redis initialization failed, falling back to in-memory store.", e);
    }
}

const addUser = async (userId, socketId) => {
    const key = `online_user:${userId}`;
    if (useRedis && redisClient) {
        await redisClient.sAdd(key, socketId);
        await redisClient.sAdd("online_users_list", String(userId));
    } else {
        if (!memoryOnlineUsers.has(userId)) {
            memoryOnlineUsers.set(userId, new Set());
        }
        memoryOnlineUsers.get(userId).add(socketId);
    }
};

const removeUser = async (userId, socketId) => {
    const key = `online_user:${userId}`;
    if (useRedis && redisClient) {
        await redisClient.sRem(key, socketId);
        const count = await redisClient.sCard(key);
        if (count === 0) {
            await redisClient.sRem("online_users_list", String(userId));
        }
    } else {
        if (memoryOnlineUsers.has(userId)) {
            const socketSet = memoryOnlineUsers.get(userId);
            socketSet.delete(socketId);
            if (socketSet.size === 0) {
                memoryOnlineUsers.delete(userId);
            }
        }
    }
};

const getSocketIds = async (userId) => {
    const key = `online_user:${userId}`;
    if (useRedis && redisClient) {
        return await redisClient.sMembers(key);
    } else {
        const socketSet = memoryOnlineUsers.get(userId);
        return socketSet ? Array.from(socketSet) : [];
    }
};

const isOnline = async (userId) => {
    const socketIds = await getSocketIds(userId);
    return socketIds.length > 0;
};

const getOnlineUserIds = async () => {
    if (useRedis && redisClient) {
        const members = await redisClient.sMembers("online_users_list");
        return members.map(Number);
    } else {
        return Array.from(memoryOnlineUsers.keys()).map(Number);
    }
};

module.exports = {
    addUser,
    removeUser,
    getSocketIds,
    isOnline,
    getOnlineUserIds
};
