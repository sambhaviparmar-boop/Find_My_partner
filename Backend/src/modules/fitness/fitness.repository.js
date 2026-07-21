const prisma = require("../../core/config/prisma");

const createFitnessPost = async (data) => {

    const fitnessPost = await prisma.fitnessPost.create({

        data,

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true
                }
            }
        }

    });

    return fitnessPost;
};



const getAllFitnessPosts = async () => {

    const fitnessPosts = await prisma.fitnessPost.findMany({

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }

    });

    return fitnessPosts;
};



const getFitnessPostById = async (id) => {

    const fitnessPost = await prisma.fitnessPost.findUnique({

        where: {
            id
        },

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true
                }
            }
        }

    });

    return fitnessPost;
};



const updateFitnessPost = async (id, data) => {

    const fitnessPost = await prisma.fitnessPost.update({

        where: {
            id
        },

        data,

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true
                }
            }
        }

    });

    return fitnessPost;
};



const deleteFitnessPost = async (id) => {

    const fitnessPost = await prisma.fitnessPost.delete({

        where: {
            id
        }

    });

    return fitnessPost;
};



module.exports = {
    createFitnessPost,
    getAllFitnessPosts,
    getFitnessPostById,
    updateFitnessPost,
    deleteFitnessPost
};