const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const shoppingServices = require("./shopping.services");


const createShoppingPost = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        location,
        category,
        budget,
        createdById
    } = req.body;

    const shoppingPost = await shoppingServices.createShoppingPost({
        title,
        description,
        location,
        category,
        budget,
        createdById
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            shoppingPost,
            "Shopping post created successfully"
        )
    );

});


const getAllShoppingPosts = asyncHandler(async (req, res) => {

    const shoppingPosts = await shoppingServices.getAllShoppingPosts();

    return res.status(200).json(
        new ApiResponse(
            200,
            shoppingPosts,
            "Shopping posts fetched successfully"
        )
    );

});


const getShoppingPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const shoppingPost = await shoppingServices.getShoppingPostById(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            shoppingPost,
            "Shopping post fetched successfully"
        )
    );

});


const updateShoppingPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        location,
        category,
        budget
    } = req.body;

    const shoppingPost = await shoppingServices.updateShoppingPost(
        Number(id),
        {
            title,
            description,
            location,
            category,
            budget
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            shoppingPost,
            "Shopping post updated successfully"
        )
    );

});


const deleteShoppingPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const shoppingPost = await shoppingServices.deleteShoppingPost(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            shoppingPost,
            "Shopping post deleted successfully"
        )
    );

});


module.exports = {
    createShoppingPost,
    getAllShoppingPosts,
    getShoppingPostById,
    updateShoppingPost,
    deleteShoppingPost
};