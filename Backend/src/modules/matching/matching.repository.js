const prisma = require("../../core/config/prisma.js")



const getCurrentUser = async({userId}) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: true,
            builderPassport: true,
            userSkills: true
        }
    });
}

const getAllOtherUsers = async({userId}) => {
    return await prisma.user.findMany({
        where: {
            id: {
                not: userId
            }
        },
        include: {
            profile: true,
            builderPassport: true,
            userSkills: true
        }
    });
}

const getUserSkills = async({userId}) => {
    return await prisma.userSkill.findMany({
        where: {
            userId
        },
        include: {
            skill: true
        }
    });
}

const getBuilderPassport = async({userId}) => {
    return await prisma.builderPassport.findUnique({
        where: {
            userId
        }
    });
}

const saveMatch = async({senderId,receiverId,matchScore}) => {
    return await prisma.match.create({
        data: {
            senderId,
            receiverId,
            matchScore
        }
    });
}

const getRecommendations = async({userId}) => {
    return await prisma.match.findMany({
        where: {
            senderId: userId,
            status: "RECOMMENDED"
        },
        include: {
            receiver: true
        }
    });
}

const updateMatchStatus = async({senderId,receiverId,status}) => {
    return await prisma.match.update({
        where: {
            senderId,
            receiverId
        },
        data: {
            status
        }
    });
}


module.exports = {
    getCurrentUser,
    getAllOtherUsers,
    getUserSkills,
    getBuilderPassport,
    saveMatch,
    getRecommendations,
    updateMatchStatus
}