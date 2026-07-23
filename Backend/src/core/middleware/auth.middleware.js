const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.accessToken || req.headers.authorization?.replace(/^bearer\s+/i, "");

    if (token) {
        token = token.replace(/^["']|["']$/g, "");
    }

    if (!token) {
        throw new ApiError(401, "Unauthorized: Access token missing");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);
        const userId = decodedToken.id || decodedToken.userId;
        req.user = {
            ...decodedToken,
            id: userId,
            userId: userId
        };
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Invalid or expired access token");
    }
});

module.exports = {
    authMiddleware
};
