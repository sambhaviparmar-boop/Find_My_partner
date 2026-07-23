const ApiResponse = require('../../core/utils/apiResponce');
const asyncHandler = require('../../core/utils/asyncHandler');
const authServices = require('./auth.services');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await authServices.registerUser({ name, email, password });    
    return res
        .status(201)
        .json(new ApiResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.loginUser({ email, password });
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
});

const getme = asyncHandler(async (req, res) => {
    const user = await authServices.getme(req.user.id);
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await authServices.logoutUser(req.user?.id);
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged out successfully"));
});

const refreshToken = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const result = await authServices.refreshAccessToken(token);
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Token refreshed successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getme,
    refreshToken
};
