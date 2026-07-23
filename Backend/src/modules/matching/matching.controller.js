const matchingService = require("./matching.service");
const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");

const getRecommendationsController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const recommendations = await matchingService.getRecommendationsService(userId);
    return res.status(200).json(new ApiResponse(200, recommendations, "Recommendations fetched successfully"));
});

const getMatchDetailsController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const matchDetails = await matchingService.getMatchDetailsService(userId);
    return res.status(200).json(new ApiResponse(200, matchDetails, "Match details fetched successfully"));
});

const acceptMatchController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { matchId } = req.params;
    const result = await matchingService.acceptMatchService(userId, matchId);
    return res.status(200).json(new ApiResponse(200, result, "Match accepted successfully"));
});

const rejectMatchController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { matchId } = req.params;
    const result = await matchingService.rejectMatchService(userId, matchId);
    return res.status(200).json(new ApiResponse(200, result, "Match rejected successfully"));
});

const getConnectionsController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const connections = await matchingService.getConnectionsService(userId);
    return res.status(200).json(new ApiResponse(200, connections, "Connections fetched successfully"));
});

const blockUserController = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, null, "User blocked successfully"));
});

module.exports = {
    getRecommendationsController,
    getMatchDetailsController,
    acceptMatchController,
    rejectMatchController,
    getConnectionsController,
    blockUserController
};