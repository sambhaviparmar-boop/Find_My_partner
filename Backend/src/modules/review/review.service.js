const reviewRepo = require("./review.repository")

const createReviewService = async({content,rating,reviewerId,reviewedUserId,connectionId})=>{
    if(!content || !rating || !reviewerId || !reviewedUserId || !connectionId){
        throw new ApiError("All fields are required",400)
    }
    return await reviewRepo.createReviewRepo({content,rating,reviewerId,reviewedUserId,connectionId})
}

const getUserReviewsService = async(userId)=>{

    return await reviewRepo.getUserReviewsRepo(userId)
}

const getUserGivenReviewsService = async(userId)=>{
 
    return await reviewRepo.getUserGivenReviewsRepo(userId)
}

const deleteReviewService = async(id)=>{
        if(!id){
        throw new ApiError("Review ID is required",400)
    }
    return await reviewRepo.deleteReviewRepo(id)
}

const updateReviewService = async(id,data)=>{
    if(!id){
        throw new ApiError("Review ID is required",400)
    }

    return await reviewRepo.updateReviewRepo(id,data)
}

module.exports = {
    createReviewService,
    getUserReviewsService,
    getUserGivenReviewsService,
    deleteReviewService,
    updateReviewService
}
