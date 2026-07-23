const prisma = require("../../core/config/prisma");

const findById = async (id) => {
    id = Number(id);
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            profile: {
                select: {
                    bio: true,
                    avatar: true,
                    city: true
                }
            }
        }
    });

    return user;
};

const updateProfile = async (id, data) => {
    id = Number(id);
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.password !== undefined) updateData.password = data.password;
    if (data.isBlacklisted !== undefined) updateData.isBlacklisted = Boolean(data.isBlacklisted);
    if (data.refreshToken !== undefined) updateData.refreshToken = data.refreshToken;

    const user = await prisma.user.update({
        where: {
            id
        },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    return user;
};

const deleteUser = async (id) => {
    id = Number(id);
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
            createdAt: true,
            profile: {
                select: {
                    bio: true,
                    avatar: true,
                    city: true
                }
            }
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