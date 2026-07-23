const serviceController = require("./search.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");

const createSearchHistoryController = asyncHandler(async (req, res) => {
    const { userId, query, resultsCount } = req.body;
    const searchHistory = await serviceController.createSearchHistoryService({
        userId: Number(userId || req.user.id),
        query,
        resultsCount
    });
    res.status(201).json(new ApiResponse(201, searchHistory, "Search history created successfully"));
});

const getMySearchHistoryController = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const searchHistory = await serviceController.getMySearchHistoryService({ userId: Number(userId || req.user.id) });
    res.status(200).json(new ApiResponse(200, searchHistory, "Search history fetched successfully"));
});

const getAllSearchHistoryController = asyncHandler(async (req, res) => {
    const searchHistory = await serviceController.getAllSearchHistoryService();
    res.status(200).json(new ApiResponse(200, searchHistory, "Search history fetched successfully"));
});

module.exports = {
    createSearchHistoryController,
    getMySearchHistoryController,
    getAllSearchHistoryController
};
