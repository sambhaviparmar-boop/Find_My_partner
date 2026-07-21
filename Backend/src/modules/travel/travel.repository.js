const prisma = require("../../core/config/prisma");


const createTravelPost = async (data) => {

    const travelPost = await prisma.travelPost.create({

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

    return travelPost;
};


const getAllTravelPosts = async () => {

    const travelPosts = await prisma.travelPost.findMany({

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

    return travelPosts;
};


const getTravelPostById = async (id) => {

    const travelPost = await prisma.travelPost.findUnique({

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

    return travelPost;
};


const updateTravelPost = async (id, data) => {

    const travelPost = await prisma.travelPost.update({

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

    return travelPost;
};


const deleteTravelPost = async (id) => {

    const travelPost = await prisma.travelPost.delete({

        where: {
            id
        }

    });

    return travelPost;
};


module.exports = {
    createTravelPost,
    getAllTravelPosts,
    getTravelPostById,
    updateTravelPost,
    deleteTravelPost
};