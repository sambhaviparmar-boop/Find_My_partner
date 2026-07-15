const jwt = require("jsonwebtoken");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiError = require("../../core/utils/apiError");


const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized: Access token missing");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Invalid or expired access token");
    }
});

module.exports = {
    authMiddleware
}
