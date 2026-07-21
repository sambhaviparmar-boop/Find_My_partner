const prisma = require("../../core/config/prisma");


const createNetworkingPost = async (data) => {

    const networkingPost = await prisma.networkingPost.create({

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

    return networkingPost;
};


const getAllNetworkingPosts = async () => {

    const networkingPosts = await prisma.networkingPost.findMany({

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

    return networkingPosts;
};


const getNetworkingPostById = async (id) => {

    const networkingPost = await prisma.networkingPost.findUnique({

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

    return networkingPost;
};


const updateNetworkingPost = async (id, data) => {

    const networkingPost = await prisma.networkingPost.update({

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

    return networkingPost;
};


const deleteNetworkingPost = async (id) => {

    const networkingPost = await prisma.networkingPost.delete({

        where: {
            id
        }

    });

    return networkingPost;
};


module.exports = {
    createNetworkingPost,
    getAllNetworkingPosts,
    getNetworkingPostById,
    updateNetworkingPost,
    deleteNetworkingPost
};