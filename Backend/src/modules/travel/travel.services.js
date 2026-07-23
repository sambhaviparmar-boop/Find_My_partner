const ApiError = require("../../core/utils/apiError");
const travelRepo = require("./travel.repository");


const createTravelPost = async (data) => {

    const travelPost = await travelRepo.createTravelPost(data);

    return travelPost;
};


const getAllTravelPosts = async () => {

    const travelPosts = await travelRepo.getAllTravelPosts();

    return travelPosts;
};


const getTravelPostById = async (id) => {

    const travelPost = await travelRepo.getTravelPostById(id);

    if (!travelPost) {
        throw new ApiError(404, "Travel post not found");
    }

    return travelPost;
};


const updateTravelPost = async (id, data) => {

    await getTravelPostById(id);

    const travelPost = await travelRepo.updateTravelPost(id, data);

    return travelPost;
};


const deleteTravelPost = async (id) => {

    await getTravelPostById(id);

    const travelPost = await travelRepo.deleteTravelPost(id);

    return travelPost;
};


module.exports = {
    createTravelPost,
    getAllTravelPosts,
    getTravelPostById,
    updateTravelPost,
    deleteTravelPost
};