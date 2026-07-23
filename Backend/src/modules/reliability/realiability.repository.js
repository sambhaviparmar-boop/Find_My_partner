const prisma = require("../../core/config/prisma")

const createReliability = async (data) => {
    return await prisma.reliability.create({
        data
    })
}

const getReliability = async (userId, category) => {
    return await prisma.reliability.findUnique({
        where: {
            userId_category: {
                userId,
                category
            }
        }
    })
}

const getAllReliabilities = async (userId) => {
    return await prisma.reliability.findMany({
        where: {
            userId
        }
    })
}

const updateReliability = async (userId, category, data) => {
    return await prisma.reliability.update({
        where: {
            userId_category: {
                userId,
                category
            }
        },
        data
    })
}

const deleteReliability = async (userId, category) => {
    return await prisma.reliability.delete({
        where: {
            userId_category: {
                userId,
                category
            }
        }
    })
}

module.exports = {
    createReliability,
    getReliability,
    getAllReliabilities,
    updateReliability,
    deleteReliability
}

