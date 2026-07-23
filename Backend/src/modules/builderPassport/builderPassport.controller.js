const {getMyPassportService, createPassportService, getPassportByUserIdService, updatePassportService, deletePassportService} = require("./builderPassport.services")
const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");

const createPassportController = asyncHandler(async (req, res) => {
    const {github,linkedin,leetcode,codeforces,portfolio} = req.body;
    const userId = req.user?.id;
    if(!userId){
        throw new ApiError(401,"Unauthorized");
    }   
    const passport = await createPassportService({userId,github,linkedin,leetcode,codeforces,portfolio});
    return res.status(201).json(new ApiResponse(201,passport,"Passport created successfully"));
})

const getMyPassportController = asyncHandler(async (req, res) => {
    const passport = await getMyPassportService(req.user.id);
    return res.status(200).json(new ApiResponse(200,passport,"My passport fetched successfully"));
})

const getPassportByUserIdController = asyncHandler(async (req, res) => {
    const passport = await getPassportByUserIdService(req.params.userId);
    return res.status(200).json(new ApiResponse(200,passport,"Passport fetched successfully"));
})

const updatePassportController = asyncHandler(async (req, res) => {
    const {github,linkedin,leetcode,codeforces,portfolio} = req.body;
   const userId = req.user?.id;
   if(!userId){
    throw new ApiError(401,"Unauthorized");
   }

    const passport = await updatePassportService({userId,github,linkedin,leetcode,codeforces,portfolio});
    return res.status(200).json(new ApiResponse(200,passport,"Passport updated successfully"));
})

const deletePassportController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if(!userId){
        throw new ApiError(401,"Unauthorized");
    }
    const passport = await deletePassportService(userId);   
    return res.status(200).json(new ApiResponse(200,passport,"Passport deleted successfully"));
})

module.exports = {
    createPassportController,
    getMyPassportController,
    getPassportByUserIdController,
    updatePassportController,
    deletePassportController
}