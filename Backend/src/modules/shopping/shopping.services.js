const ApiError = require("../../core/utils/apiError");
const shoppingRepo = require("./shopping.repository");


const createShoppingPost = async (data) => {

    const shoppingPost = await shoppingRepo.createShoppingPost(data);

    return shoppingPost;
};


const getAllShoppingPosts = async () => {

    const shoppingPosts = await shoppingRepo.getAllShoppingPosts();

    return shoppingPosts;
};


const getShoppingPostById = async (id) => {

    const shoppingPost = await shoppingRepo.getShoppingPostById(id);

    if (!shoppingPost) {
        throw new ApiError(404, "Shopping post not found");
    }

    return shoppingPost;
};


const updateShoppingPost = async (id, data) => {

    await getShoppingPostById(id);

    const shoppingPost = await shoppingRepo.updateShoppingPost(id, data);

    return shoppingPost;
};


const deleteShoppingPost = async (id) => {

    await getShoppingPostById(id);

    const shoppingPost = await shoppingRepo.deleteShoppingPost(id);

    return shoppingPost;
};


module.exports = {
    createShoppingPost,
    getAllShoppingPosts,
    getShoppingPostById,
    updateShoppingPost,
    deleteShoppingPost
};