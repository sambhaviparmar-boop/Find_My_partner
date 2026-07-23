const ApiError = require("../../core/utils/apiError");
const studyRepo = require("./study.repository");


const createStudyPost = async (data) => {

    const studyPost = await studyRepo.createStudyPost(data);

    return studyPost;
};


const getAllStudyPosts = async () => {

    const studyPosts = await studyRepo.getAllStudyPosts();

    return studyPosts;
};


const getStudyPostById = async (id) => {

    const studyPost = await studyRepo.getStudyPostById(id);

    if (!studyPost) {
        throw new ApiError(404, "Study post not found");
    }

    return studyPost;
};


const updateStudyPost = async (id, data) => {

    await getStudyPostById(id);

    const studyPost = await studyRepo.updateStudyPost(id, data);

    return studyPost;
};


const deleteStudyPost = async (id) => {

    await getStudyPostById(id);

    const studyPost = await studyRepo.deleteStudyPost(id);

    return studyPost;
};


module.exports = {
    createStudyPost,
    getAllStudyPosts,
    getStudyPostById,
    updateStudyPost,
    deleteStudyPost
};