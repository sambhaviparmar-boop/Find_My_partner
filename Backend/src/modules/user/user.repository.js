const prisma = require("../../core/config/prisma");



const findById = async (id) => {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            avatar: true,
            location: true,
            createdAt: true
        }
    });

    return user;
};



const updateProfile = async (id, data) => {

    const user = await prisma.user.update({

        where: {
            id
        },

        data,

        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            avatar: true,
            location: true,
            updatedAt: true
        }

    });


    return user;
};



const deleteUser = async (id) => {

    const user = await prisma.user.delete({

        where: {
            id
        }

    });


    return user;
};



const findAll = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            avatar: true,
            location: true,
            createdAt: true
        }
    });
    return users;
};



module.exports = {
    findById,
    updateProfile,
    deleteUser,
    findAll
};