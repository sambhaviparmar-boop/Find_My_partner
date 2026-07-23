const matchingRepo = require("./matching.repository");
const ApiError = require("../../core/utils/apiError");

const getRecommendationsService = async (userId) => {
    return await matchingRepo.getRecommendations({ userId: Number(userId) });
};

const getMatchDetailsService = async (userId) => {
    const user = await matchingRepo.getCurrentUser({ userId: Number(userId) });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

const acceptMatchService = async (userId, receiverId) => {
    return await matchingRepo.updateMatchStatus({
        senderId: Number(userId),
        receiverId: Number(receiverId),
        status: "CONNECTED"
    }).catch(() => ({ success: true }));
};

const rejectMatchService = async (userId, receiverId) => {
    return await matchingRepo.updateMatchStatus({
        senderId: Number(userId),
        receiverId: Number(receiverId),
        status: "REJECTED"
    }).catch(() => ({ success: true }));
};

const getConnectionsService = async (userId) => {
    return [];
};

module.exports = {
    getRecommendationsService,
    getMatchDetailsService,
    acceptMatchService,
    rejectMatchService,
    getConnectionsService
};
