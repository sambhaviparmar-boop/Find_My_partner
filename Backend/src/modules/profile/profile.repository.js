const prisma = require("../../core/config/prisma");

const createProfile = async ({ userId, bio, avatar, location, city, college, branch, year, github, linkedin, portfolio }) => {
    return prisma.profile.create({
        data: {
            userId: Number(userId),
            bio,
            avatar,
            city: city || location || null,
            college,
            branch,
            year: Number(year),
            github,
            linkedin,
            portfolio
        }
    });
};

const updateProfile = async ({ userId, bio, avatar, location, city, college, branch, year, github, linkedin, portfolio }) => {
    return prisma.profile.update({
        where: { userId: Number(userId) },
        data: {
            bio,
            avatar,
            city: city || location || null,
            college,
            branch,
            year: Number(year),
            github,
            linkedin,
            portfolio
        }
    });
};

const getProfileByUserId = async (userId) => {
    return prisma.profile.findUnique({
        where: { userId: Number(userId) },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
};

const deleteProfile = async (userId) => {
    return prisma.profile.delete({
        where: { userId: Number(userId) }
    });
};

const findById = async (id) => {
    return prisma.profile.findUnique({
        where: { id: Number(id) },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
};

module.exports = {
    createProfile,
    updateProfile,
    getProfileByUserId,
    deleteProfile,
    findById   
};