const prisma = require("../../core/config/prisma");

const getAllUsersRepository = async (filters = {}) => {
    return prisma.user.findMany({
        where: filters,
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getUserByIdRepository = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

const deleteUserRepository = async (id) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
};

const updateUserRepository = async (id, data) => {
    return prisma.user.update({
        where: {
            id,
        },
        data,
    });
};

const countUsersRepository = async () => {
    return prisma.user.count();
};

const getAllTeamsRepository = async (filters = {}) => {
    return prisma.team.findMany({
        where: filters,
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getTeamByIdRepository = async (id) => {
    return prisma.team.findUnique({
        where: { id },
    });
};

const deleteTeamRepository = async (id) => {
    return prisma.team.delete({
        where: {
            id,
        },
    });
};


const updateTeamRepository = async (id, data) => {
    return prisma.team.update({
        where: {
            id,
        },
        data,
    });
};


const countTeamsRepository = async () => {
    return prisma.team.count();
};

    



module.exports = {
    getAllUsersRepository,
    getAllTeamsRepository,
    getTeamByIdRepository,
    deleteTeamRepository,
    updateTeamRepository,
    countTeamsRepository,
    
    getUserByIdRepository,
    deleteUserRepository,
    updateUserRepository,
    countUsersRepository,
};
