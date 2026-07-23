const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
    // Extract token from auth payload or query parameters
    let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (token && token.toLowerCase().startsWith("bearer ")) {
        token = token.substring(7);
    }

    if (token) {
        token = token.replace(/^["']|["']$/g, "");
    }

    if (!token) {
        return next(new Error("Authentication error: Access token missing"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "default_secret");
        const userId = decodedToken.id || decodedToken.userId;
        
        socket.user = {
            ...decodedToken,
            id: Number(userId),
            userId: Number(userId)
        };
        next();
    } catch (error) {
        next(new Error("Authentication error: Invalid or expired access token"));
    }
};

module.exports = socketAuth;
