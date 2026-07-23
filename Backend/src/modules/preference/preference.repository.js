const Prisma = require("../../core/config/prisma");

const createPreference = async ({userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed}) => {
    return await Prisma.userPreference.create({
        data: {
            userId,
            category,
            lookingFor,
            skillsNeeded,
            interests,
            locationPreference,
            maxDistance,
            isRemoteAllowed
        }
    });
}

const updatePreference = async ({id,userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed}) => {
    return await Prisma.userPreference.update({
        where: {
            id
        },
        data: {
            userId,
            category,
            lookingFor,
            skillsNeeded,
            interests,
            locationPreference,
            maxDistance,
            isRemoteAllowed
        }
    });
}

const deletePreference = async ({id}) => {
    return await Prisma.userPreference.delete({
        where: {
            id
        }
    });
}

const getPreferenceById = async ({id}) => {
    return await Prisma.userPreference.findUnique({
        where: {
            id
        }
    });
}

const getPreferenceByUserId = async ({userId}) => {
    return await Prisma.userPreference.findUnique({
        where: {
            userId
        }
    });
}

module.exports = {
    createPreference,
    updatePreference,
    deletePreference,
    getPreferenceById,
    getPreferenceByUserId
}   