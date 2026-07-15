const authRepo = require("./auth.repository");

const bcrypt = require('bcrypt');
const ApiError = require("../../core/utils/apiError");
const { generateAccessToken, generateRefreshToken } = require("../../core/utils/jwt");

const registerUser = async ({name, email, password}) => {



    const isUserExist = await authRepo.findByEmail(email);
    if(isUserExist){
        throw new ApiError(400, "User already exists");
    } 
    
   

     const hashPass = await bcrypt.hash(password, 10)
    const user = await authRepo.createUser({name, email, password:hashPass});


    const accessToken = generateAccessToken({userId: user.id})
    const refreshToken = generateRefreshToken({userId: user.id})


    return {
        user,
        accessToken,
        refreshToken
    };

}   
const loginUser = async ({email, password}) => {
    const user = await authRepo.findByEmail(email);
    if(!user){
        throw new ApiError(404, "User not found");
    }

    // if(!user.isBlacklisted){
    //     throw new ApiError(401, "Sorry, You are not authorised to login ");
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }


    

    const accessToken = generateAccessToken({userId: user.id})
    const refreshToken = generateRefreshToken({userId: user.id})

    await authRepo.updateToken(user.id, refreshToken)
    
    return {
        user,
        accessToken,
        refreshToken
    };

}   

const getme = async(userId)=>{

    const user = await authRepo.findById(userId);


    if(!user){
        throw new ApiError(
            404,
            "User not found"
        );
    }


    return user;

};

const logoutUser = async(userId)=>{

    const user = await authRepo.findById(userId);


    if(!user){
        throw new ApiError(
            404,
            "User not found"
        );
    }


    const updatedUser = await authRepo.updateToken(userId, null);


    return updatedUser;

};


module.exports = {
    registerUser,
    loginUser,
   logoutUser,
    getme
}