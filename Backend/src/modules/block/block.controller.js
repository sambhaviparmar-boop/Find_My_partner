const blockService = require("./block.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");

const blockUserController = asyncHandler(async(req, res) => {
    const blockerId = req.user.id;
    const { blockedId } = req.body;
    const blocked = await blockService.blockUserService({ blockerId, blockedId });
    return res.status(201).json(new ApiResponse(201, blocked, "User blocked successfully"));
});

const deleteBlockController = asyncHandler(async(req, res) => {
    const blockerId = req.user.id;
    const blockedId = req.params.id;
    const result = await blockService.unblockUserService({ blockerId, blockedId });
    return res.status(200).json(new ApiResponse(200, result, "User unblocked successfully"));
});

const getAllBlocksController = asyncHandler(async(req, res) => {
    const blockerId = req.user.id;
    const blocks = await blockService.getAllBlocksService(blockerId);
    return res.status(200).json(new ApiResponse(200, blocks, "Blocked users fetched successfully"));
});

module.exports = {
    blockUserController,
    deleteBlockController,
    getAllBlocksController
};
