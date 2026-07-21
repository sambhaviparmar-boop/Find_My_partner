const prisma = require("../../core/config/prisma");


const createShoppingPost = async (data) => {

    const shoppingPost = await prisma.shoppingPost.create({

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

    return shoppingPost;
};


const getAllShoppingPosts = async () => {

    const shoppingPosts = await prisma.shoppingPost.findMany({

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

    return shoppingPosts;
};


const getShoppingPostById = async (id) => {

    const shoppingPost = await prisma.shoppingPost.findUnique({

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

    return shoppingPost;
};


const updateShoppingPost = async (id, data) => {

    const shoppingPost = await prisma.shoppingPost.update({

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

    return shoppingPost;
};


const deleteShoppingPost = async (id) => {

    const shoppingPost = await prisma.shoppingPost.delete({

        where: {
            id
        }

    });

    return shoppingPost;
};


module.exports = {
    createShoppingPost,
    getAllShoppingPosts,
    getShoppingPostById,
    updateShoppingPost,
    deleteShoppingPost
};