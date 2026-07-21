const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const networkingServices = require("./networking.services");


const createNetworkingPost = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        profession,
        industry,
        networkingGoal,
        experienceLevel,
        location,
        mode,
        createdById
    } = req.body;

    const networkingPost = await networkingServices.createNetworkingPost({
        title,
        description,
        profession,
        industry,
        networkingGoal,
        experienceLevel,
        location,
        mode,
        createdById
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            networkingPost,
            "Networking post created successfully"
        )
    );
});


const getAllNetworkingPosts = asyncHandler(async (req, res) => {

    const networkingPosts = await networkingServices.getAllNetworkingPosts();

    return res.status(200).json(
        new ApiResponse(
            200,
            networkingPosts,
            "Networking posts fetched successfully"
        )
    );
});


const getNetworkingPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const networkingPost = await networkingServices.getNetworkingPostById(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            networkingPost,
            "Networking post fetched successfully"
        )
    );
});


const updateNetworkingPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        profession,
        industry,
        networkingGoal,
        experienceLevel,
        location,
        mode
    } = req.body;

    const networkingPost = await networkingServices.updateNetworkingPost(
        Number(id),
        {
            title,
            description,
            profession,
            industry,
            networkingGoal,
            experienceLevel,
            location,
            mode
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            networkingPost,
            "Networking post updated successfully"
        )
    );
});


const deleteNetworkingPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const networkingPost = await networkingServices.deleteNetworkingPost(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            networkingPost,
            "Networking post deleted successfully"
        )
    );
});


module.exports = {
    createNetworkingPost,
    getAllNetworkingPosts,
    getNetworkingPostById,
    updateNetworkingPost,
    deleteNetworkingPost
};