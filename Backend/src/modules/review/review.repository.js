const prisma = require("../../core/config/prisma");
const ApiError = require("../../core/utils/apiError");

const createReview = async (data) => {
    const reviewerId = Number(data.reviewerId);
    const reviewedUserId = Number(data.reviewedUserId);

    const review = await prisma.review.create({
        data: {
            reviewerId,
            reviewedUserId,
            rating: Number(data.rating),
            comment: data.comment,
            category: data.category || "GENERAL"
        }
    });

    return review;
};

const getUserReviews = async (userId) => {
    return await prisma.review.findMany({
        where: {
            reviewedUserId: Number(userId)
        }
    });
};

const getUserGivenReviews = async (userId) => {
    return await prisma.review.findMany({
        where: {
            reviewerId: Number(userId)
        }
    });
};

const deleteReview = async (id) => {
    return await prisma.review.delete({
        where: {
            id: Number(id)
        }
    });
};

const updateReview = async (id, data) => {
    return await prisma.review.update({
        where: {
            id: Number(id)
        },
        data
    });
};

module.exports = {
    createReview,
    getUserReviews,
    getUserGivenReviews,
    deleteReview,
    updateReview
};
