const jwt = require("jsonwebtoken");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiError = require("../../core/utils/apiError");


const authMiddleware =()    =>
{
    asyncHandler(async(req,res,next)=>{

        const token = req.cookie.accessToken

        if(!token){
            throw new ApiError(401, "Unauthorized")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()

    })

}

module.exports = {
    authMiddleware
}
