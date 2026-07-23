const prisma = require("../../core/config/prisma");

const createSearchHistoryRepo = async (data) => {
    return await prisma.searchHistory.create({
        data: {
            ...data,
            userId: Number(data.userId)
        }
    });
};

const getMySearchHistoryRepo = async (data) => {
    return await prisma.searchHistory.findMany({
        where: {
            userId: Number(data.userId)
        }
    });
};

const getAllSearchHistoryRepo = async () => {
    return await prisma.searchHistory.findMany();
};

module.exports = {
    createSearchHistoryRepo,
    getMySearchHistoryRepo,
    getAllSearchHistoryRepo
};