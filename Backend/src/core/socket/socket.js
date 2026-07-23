const { Server } = require("socket.io");
const socketAuth = require("./socketAuth");
const { registerSocketEvents } = require("./socketEvents");

let io = null;

const init = (server) => {
    if (io) {
        console.warn("Socket.IO is already initialized!");
        return io;
    }

    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        },
        pingTimeout: 60000,
        pingInterval: 25000,
        transports: ["websocket", "polling"]
    });

    // Attach JWT socket authentication middleware
    io.use(socketAuth);

    // Register events on new connections
    io.on("connection", (socket) => {
        registerSocketEvents(io, socket);
    });

    console.log("Socket.IO Server successfully initialized");
    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized! Please call init(server) first.");
    }
    return io;
};

module.exports = {
    init,
    getIO
};
