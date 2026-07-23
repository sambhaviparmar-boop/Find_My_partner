const realiabilityService= require("./realiability.service")
const asyncHandler= require("../../core/utils/asyncHandler")
const apiResponce = require("../../core/utils/apiResponce")
const createReliabilityController = asyncHandler(async (req, res) => {
    const {userId, category, totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount} = req.body;
    const reliability = await realiabilityService.createReliabilityService({userId, category, totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount});
    return res.status(201).json(new apiResponce(201,"Reliability created successfully",reliability))
})

const getReliabilityController = asyncHandler(async (req, res) => {
    const {userId} = req.params;
    const reliability = await realiabilityService.getReliabilityService(userId);
    return res.status(200).json(new apiResponce(200,"Reliability fetched successfully",reliability))
})

const updateReliabilityController = asyncHandler(async (req, res) => {
    const {userId, category, totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount} = req.body;
    const reliability = await realiabilityService.updateReliabilityService(userId, {category, totalConnections, successfulConnections, completedCollaborations, responseRate, reviewsCount});
    return res.status(200).json(new apiResponce(200,"Reliability updated successfully",reliability))
})

const deleteReliabilityController = asyncHandler(async (req, res) => {
    const {userId} = req.params;
    const reliability = await realiabilityService.deleteReliabilityService(userId);
    return res.status(200).json(new apiResponce(200,"Reliability deleted successfully",reliability))
})

module.exports = {
    createReliabilityController,
    getReliabilityController,
    updateReliabilityController,
    deleteReliabilityController
}