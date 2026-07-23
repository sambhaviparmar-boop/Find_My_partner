const ApiError = require("../../core/utils/apiError");
const fitnessRepo = require("./fitness.repository");

const createFitnessPost = async (data) => {

    const fitnessPost = await fitnessRepo.createFitnessPost(data);

    return fitnessPost;
};


const getAllFitnessPosts = async () => {

    const fitnessPosts = await fitnessRepo.getAllFitnessPosts();

    return fitnessPosts;
};


const getFitnessPostById = async (id) => {

    const fitnessPost = await fitnessRepo.getFitnessPostById(id);

    if (!fitnessPost) {
        throw new ApiError(404, "Fitness post not found");
    }

    return fitnessPost;
};


const updateFitnessPost = async (id, data) => {

    await getFitnessPostById(id);

    const fitnessPost = await fitnessRepo.updateFitnessPost(id, data);

    return fitnessPost;
};


const deleteFitnessPost = async (id) => {

    await getFitnessPostById(id);

    const fitnessPost = await fitnessRepo.deleteFitnessPost(id);

    return fitnessPost;
};


module.exports = {
    createFitnessPost,
    getAllFitnessPosts,
    getFitnessPostById,
    updateFitnessPost,
    deleteFitnessPost
};