const aiService = require("./ai.services");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");
const ApiError = require("../../core/utils/apiError");

const findSimilarUsersController = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    const similarUsers = await aiService.findSimilarUsersService(Number(userId));
    return res.status(200).json(new ApiResponse(200, similarUsers, "Similar users fetched successfully"));
});

module.exports = {
    findSimilarUsersController
};
