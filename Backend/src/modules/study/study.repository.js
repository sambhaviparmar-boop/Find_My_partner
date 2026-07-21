const prisma = require("../../core/config/prisma");


const createStudyPost = async (data) => {

    const studyPost = await prisma.studyPost.create({

        data,

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }

    });

    return studyPost;
};


const getAllStudyPosts = async () => {

    const studyPosts = await prisma.studyPost.findMany({

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }

    });

    return studyPosts;
};


const getStudyPostById = async (id) => {

    const studyPost = await prisma.studyPost.findUnique({

        where: {
            id
        },

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }

    });

    return studyPost;
};


const updateStudyPost = async (id, data) => {

    const studyPost = await prisma.studyPost.update({

        where: {
            id
        },

        data,

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }

    });

    return studyPost;
};


const deleteStudyPost = async (id) => {

    const studyPost = await prisma.studyPost.delete({

        where: {
            id
        }

    });

    return studyPost;
};


module.exports = {
    createStudyPost,
    getAllStudyPosts,
    getStudyPostById,
    updateStudyPost,
    deleteStudyPost
};