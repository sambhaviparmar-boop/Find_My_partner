const reviewService = require("./review.service")
const apiResponce = require("../../core/utils/apiResponce")
const asyncHandler = require("../../core/utils/asyncHandler")


const createReviewController = asyncHandler(async(req,res) => {
    const { content, rating, reviewerId, reviewedUserId, connectionId } = req.body;
    const review = await reviewService.createReviewService({ content, rating, reviewerId, reviewedUserId, connectionId });
    return res.status(201).json(new apiResponce(201,"Review created successfully",review));
})

const getUserReviewsController = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const reviews = await reviewService.getUserReviewsService(userId);
    return res.status(200).json(    new apiResponce(200,"Reviews fetched successfully",reviews));
})

const getUserGivenReviewsController = asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const reviews = await reviewService.getUserGivenReviewsService(userId);
    return res.status(200).json(new apiResponce(200,"Reviews fetched successfully",reviews));
})

const deleteReviewController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const review = await reviewService.deleteReviewService(id);
    return res.status(200).json(new apiResponce(200,"Review deleted successfully",review));
})

const updateReviewController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { content, rating } = req.body;
    const review = await reviewService.updateReviewService(id, { content, rating });
    return res.status(200).json(new apiResponce(200,"Review updated successfully",review));
})

module.exports = {
    createReviewController,
    getUserReviewsController,
    getUserGivenReviewsController,
    deleteReviewController,
    updateReviewController
}   