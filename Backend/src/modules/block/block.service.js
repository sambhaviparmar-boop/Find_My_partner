const blockRepo = require("./block.repository");
const ApiError = require("../../core/utils/apiError");

const blockUserService = async ({ blockerId, blockedId }) => {
    if (!blockerId || !blockedId) throw new ApiError(400, "Missing required fields");
    return await blockRepo.blockUser({ blockerId, blockedId });
};

const unblockUserService = async ({ blockerId, blockedId }) => {
    if (!blockerId || !blockedId) throw new ApiError(400, "Missing required fields");
    return await blockRepo.unblockUser({ blockerId, blockedId });
};

const getAllBlocksService = async (blockerId) => {
    return await blockRepo.getAllBlocks(blockerId);
};

module.exports = {
    blockUserService,
    unblockUserService,
    getAllBlocksService
};
