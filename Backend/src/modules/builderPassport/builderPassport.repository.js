const prisma = require("../../core/config/prisma")

const createBuilderPassport = async({userId,github,linkedin,leetcode,codeforces,portfolio,githubScore,leetcodeScore,codeforcesScore,totalScore}) => {
    return await prisma.builderPassport.create({
        data: {
            userId,
            github,
            linkedin,
            leetcode,
            codeforces,
            portfolio,
            githubScore,
            leetcodeScore,
            codeforcesScore,
            totalScore
        }
    })
}

const getBuilderPassport = async({userId}) => {
    return await prisma.builderPassport.findUnique({
        where: {
            userId
        }
    })
}

const getAllBuilderPassports = async() => {
    return await prisma.builderPassport.findMany()
}

const updateBuilderPassport = async({userId,github,linkedin,leetcode,codeforces,portfolio,githubScore,leetcodeScore,codeforcesScore,totalScore}) => {
    return await prisma.builderPassport.update({
        where: {
            userId
        },
        data: {
            github,
            linkedin,
            leetcode,
            codeforces,
            portfolio,
            githubScore,
            leetcodeScore,
            codeforcesScore,
            totalScore
        }
    })
}

const deleteBuilderPassport = async({userId}) => {
    return await prisma.builderPassport.delete({
        where: {
            userId
        }
    })
}




const getUserProfileAndPassport = async({userId}) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            builderPassport: true
        }
    })
}

module.exports = {
    createBuilderPassport,
    getBuilderPassport,
    getAllBuilderPassports,
    updateBuilderPassport,
    deleteBuilderPassport,
    getUserProfileAndPassport,
    
    // Service aliases
    findByUserId: async (userId) => getBuilderPassport({ userId: Number(userId) }),
    createPassport: async (data) => createBuilderPassport({ ...data, userId: Number(data.userId) }),
    updatePassport: async (data) => updateBuilderPassport({ ...data, userId: Number(data.userId) }),
    deletePassport: async (userId) => deleteBuilderPassport({ userId: Number(userId) })
}

