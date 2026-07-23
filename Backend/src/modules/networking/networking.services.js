const ApiError = require("../../core/utils/apiError");
const networkingRepo = require("./networking.repository");


const createNetworkingPost = async (data) => {

    const networkingPost = await networkingRepo.createNetworkingPost(data);

    return networkingPost;
};


const getAllNetworkingPosts = async () => {

    const networkingPosts = await networkingRepo.getAllNetworkingPosts();

    return networkingPosts;
};


const getNetworkingPostById = async (id) => {

    const networkingPost = await networkingRepo.getNetworkingPostById(id);

    if (!networkingPost) {
        throw new ApiError(404, "Networking post not found");
    }

    return networkingPost;
};


const updateNetworkingPost = async (id, data) => {

    await getNetworkingPostById(id);

    const networkingPost = await networkingRepo.updateNetworkingPost(
        id,
        data
    );

    return networkingPost;
};


const deleteNetworkingPost = async (id) => {

    await getNetworkingPostById(id);

    const networkingPost = await networkingRepo.deleteNetworkingPost(id);

    return networkingPost;
};


module.exports = {
    createNetworkingPost,
    getAllNetworkingPosts,
    getNetworkingPostById,
    updateNetworkingPost,
    deleteNetworkingPost
};