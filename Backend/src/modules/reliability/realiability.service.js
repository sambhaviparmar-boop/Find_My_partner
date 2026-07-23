const realiabilityRepo = require("./realiability.repository");
const ApiError = require("../../core/utils/apiError");

const calculateReliability = (reliability) => {
    const { totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount } = reliability;
    const score = (totalConnections * 0.1) + (successfulConnections * 0.2) + (completedCollaborations * 0.3) + (responseRate * 0.2) + (reviewsCount * 0.2);
    return score;
};

const createReliabilityService = async ({ userId, category, totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount }) => {
    const reliability = await realiabilityRepo.createReliability({
        userId: Number(userId),
        category,
        totalConnections,
        successfulConnections,
        completedCollaborations,
        responseRate,
        reviewsCount
    });
    return reliability;
};

const getReliabilityService = async (userId, category) => {
    const reliability = await realiabilityRepo.getAllReliabilities(Number(userId));
    if (!reliability || reliability.length === 0) {
        throw new ApiError(404, "Reliability not found");
    }
    return reliability;
};

const getAllReliabilitiesService = async (userId) => {
    const reliabilities = await realiabilityRepo.getAllReliabilities(Number(userId));
    if (!reliabilities) {
        throw new ApiError(404, "Reliabilities not found");
    }
    return reliabilities;
};

const updateReliabilityService = async (userId, category, data) => {
    const reliability = await realiabilityRepo.updateReliability(Number(userId), category, data);
    if (!reliability) {
        throw new ApiError(404, "Reliability not found");
    }
    return reliability;
};

const deleteReliabilityService = async (userId, category) => {
    const reliability = await realiabilityRepo.deleteReliability(Number(userId), category);
    if (!reliability) {
        throw new ApiError(404, "Reliability not found");
    }
    return reliability;
};

module.exports = {
    createReliabilityService,
    getReliabilityService,
    getAllReliabilitiesService,
    updateReliabilityService,
    deleteReliabilityService
};