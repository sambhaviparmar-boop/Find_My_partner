const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const travelServices = require("./travel.services");


const createTravelPost = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        source,
        destination,
        travelDate,
        transportation,
        budget,
        genderPreference,
        createdById
    } = req.body;

    const travelPost = await travelServices.createTravelPost({
        title,
        description,
        source,
        destination,
        travelDate,
        transportation,
        budget,
        genderPreference,
        createdById
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            travelPost,
            "Travel post created successfully"
        )
    );

});


const getAllTravelPosts = asyncHandler(async (req, res) => {

    const travelPosts = await travelServices.getAllTravelPosts();

    return res.status(200).json(
        new ApiResponse(
            200,
            travelPosts,
            "Travel posts fetched successfully"
        )
    );

});


const getTravelPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const travelPost = await travelServices.getTravelPostById(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            travelPost,
            "Travel post fetched successfully"
        )
    );

});


const updateTravelPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        source,
        destination,
        travelDate,
        transportation,
        budget,
        genderPreference
    } = req.body;

    const travelPost = await travelServices.updateTravelPost(
        Number(id),
        {
            title,
            description,
            source,
            destination,
            travelDate,
            transportation,
            budget,
            genderPreference
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            travelPost,
            "Travel post updated successfully"
        )
    );

});


const deleteTravelPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const travelPost = await travelServices.deleteTravelPost(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            travelPost,
            "Travel post deleted successfully"
        )
    );

});


module.exports = {
    createTravelPost,
    getAllTravelPosts,
    getTravelPostById,
    updateTravelPost,
    deleteTravelPost
};