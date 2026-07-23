const authRepo = require("./auth.repository");
const bcrypt = require('bcrypt');
const ApiError = require("../../core/utils/apiError");
const { generateAccessToken, generateRefreshToken } = require("../../core/utils/jwt");
const jwt = require("jsonwebtoken");

const registerUser = async ({name, email, password}) => {
    const isUserExist = await authRepo.findByEmail(email);
    if(isUserExist){
        throw new ApiError(400, "User already exists");
    } 
    
    const hashPass = await bcrypt.hash(password, 10);
    const user = await authRepo.createUser({name, email, password:hashPass});

    const accessToken = generateAccessToken({userId: user.id});
    const refreshToken = generateRefreshToken({userId: user.id});

    return {
        user,
        accessToken,
        refreshToken
    };
};

const loginUser = async ({email, password}) => {
    const user = await authRepo.findByEmail(email);
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    const accessToken = generateAccessToken({userId: user.id});
    const refreshToken = generateRefreshToken({userId: user.id});

    await authRepo.updateToken(user.id, refreshToken);
    
    return {
        user,
        accessToken,
        refreshToken
    };
};

const getme = async(userId)=>{
    const user = await authRepo.findById(Number(userId));
    if(!user){
        throw new ApiError(404, "User not found");
    }
    return user;
};

const logoutUser = async(userId)=>{
    const user = await authRepo.findById(Number(userId));
    if(!user){
        throw new ApiError(404, "User not found");
    }
    const updatedUser = await authRepo.updateToken(Number(userId), null);
    return updatedUser;
};

const refreshAccessToken = async (token) => {
    if (!token) {
        throw new ApiError(401, "Refresh token is missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret");
        const userId = decoded.userId || decoded.id;
        
        const user = await authRepo.findById(Number(userId));
        if (!user || user.refreshToken !== token) {
            throw new ApiError(403, "Invalid refresh token");
        }

        const accessToken = generateAccessToken({ userId: user.id });
        const newRefreshToken = generateRefreshToken({ userId: user.id });

        await authRepo.updateToken(user.id, newRefreshToken);

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    } catch (e) {
        throw new ApiError(403, "Invalid or expired refresh token");
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getme,
    refreshAccessToken
};