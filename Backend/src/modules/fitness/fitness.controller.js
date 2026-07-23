const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const fitnessServices = require("./fitness.services");

const createFitnessPost = asyncHandler(async (req, res) => {

    const { title, description, location, fitnessType, createdById } = req.body;

    const fitnessPost = await fitnessServices.createFitnessPost({
        title,
        description,
        location,
        fitnessType,
        createdById
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            fitnessPost,
            "Fitness post created successfully"
        )
    );
});


const getAllFitnessPosts = asyncHandler(async (req, res) => {

    const fitnessPosts = await fitnessServices.getAllFitnessPosts();

    return res.status(200).json(
        new ApiResponse(
            200,
            fitnessPosts,
            "Fitness posts fetched successfully"
        )
    );
});


const getFitnessPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const fitnessPost = await fitnessServices.getFitnessPostById(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            fitnessPost,
            "Fitness post fetched successfully"
        )
    );
});


const updateFitnessPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { title, description, location, fitnessType } = req.body;

    const fitnessPost = await fitnessServices.updateFitnessPost(
        Number(id),
        {
            title,
            description,
            location,
            fitnessType
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            fitnessPost,
            "Fitness post updated successfully"
        )
    );
});


const deleteFitnessPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const fitnessPost = await fitnessServices.deleteFitnessPost(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            fitnessPost,
            "Fitness post deleted successfully"
        )
    );
});


module.exports = {
    createFitnessPost,
    getAllFitnessPosts,
    getFitnessPostById,
    updateFitnessPost,
    deleteFitnessPost
};