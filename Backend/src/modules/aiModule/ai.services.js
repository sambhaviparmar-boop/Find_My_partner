const aiRepository = require("./ai.repository");
const ApiError = require("../../core/utils/apiError");

const findSimilarUsersService = async (userId) => {
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    return await aiRepository.findSimilarUsers([], [], Number(userId));
};

const generateMatchService = async (userId) => {
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    return [];
};

module.exports = {
    findSimilarUsersService,
    generateMatchService
};