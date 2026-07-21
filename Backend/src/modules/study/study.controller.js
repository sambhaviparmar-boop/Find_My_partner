const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const studyServices = require("./study.services");


const createStudyPost = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        subject,
        studyMode,
        location,
        preferredTime,
        level,
        createdById
    } = req.body;

    const studyPost = await studyServices.createStudyPost({
        title,
        description,
        subject,
        studyMode,
        location,
        preferredTime,
        level,
        createdById
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            studyPost,
            "Study post created successfully"
        )
    );
});


const getAllStudyPosts = asyncHandler(async (req, res) => {

    const studyPosts = await studyServices.getAllStudyPosts();

    return res.status(200).json(
        new ApiResponse(
            200,
            studyPosts,
            "Study posts fetched successfully"
        )
    );
});


const getStudyPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const studyPost = await studyServices.getStudyPostById(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            studyPost,
            "Study post fetched successfully"
        )
    );
});


const updateStudyPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        subject,
        studyMode,
        location,
        preferredTime,
        level
    } = req.body;

    const studyPost = await studyServices.updateStudyPost(
        Number(id),
        {
            title,
            description,
            subject,
            studyMode,
            location,
            preferredTime,
            level
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            studyPost,
            "Study post updated successfully"
        )
    );
});


const deleteStudyPost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const studyPost = await studyServices.deleteStudyPost(Number(id));

    return res.status(200).json(
        new ApiResponse(
            200,
            studyPost,
            "Study post deleted successfully"
        )
    );
});


module.exports = {
    createStudyPost,
    getAllStudyPosts,
    getStudyPostById,
    updateStudyPost,
    deleteStudyPost
};