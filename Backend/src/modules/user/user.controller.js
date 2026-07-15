const ApiResponse = require("../../core/utils/apiResponce");
const userServices = require("./user.services");
const asyncHandler = require("../../core/utils/asyncHandler");

    
const updateUser = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const { name, email, bio, avatar, location } = req.body;
    const user = await userServices.updateUser(id, { name, email, bio, avatar, location });
    return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
})

const deleteUser = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const user = await userServices.deleteUser(id);
    return res.status(200).json(new ApiResponse(200, user, "User deleted successfully"));
})

const getAllUsers = asyncHandler(async(req,res) => {
    const users = await userServices.getAllUsers();
    return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
})

const getUserById = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
})

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}