const prisma = require("../../core/config/prisma")

const createRequest = async ({ groupId, userId, message }) => {
    return await prisma.joinRequest.create({
        data: {
            groupId,
            userId,
            message
        }
    });
};

const getGroupRequests = async ({ groupId, userId }) => {
    return await prisma.joinRequest.findMany({
        where: {
            groupId,
            user: {
                id: userId
            }
        }
    });
};

const findRequest = async ({ requestId, userId, ownerId }) => {
    return await prisma.joinRequest.findUnique({
        where: {
            id: requestId,
            user: {
                id: userId
            },
            group: {
                owner: {
                    id: ownerId
                }
            }
        }
    });
};

const findById = async (requestId) => {
    return await prisma.joinRequest.findUnique({
        where: {
            id: requestId
        },
        include: {
            user: true,
            group: true
        }
    });
};

const updateStatus = async (requestId, status) => {
    return await prisma.joinRequest.update({
        where: {
            id: requestId
        },
        data: {
            status
        }
    });
};

const findRequestByUserIdAndGroupId = async ({ userId, groupId }) => {
    return await prisma.joinRequest.findFirst({
        where: {
            userId,
            groupId
        }
    });
};

const addMember = async ({ groupId, userId }) => {
    return await prisma.groupMember.create({
        data: {
            groupId,
            userId
        }
    });
};

const removeMember = async ({ groupId, userId }) => {
    return await prisma.groupMember.delete({
        where: {
            groupId_userId: {
                groupId,
                userId
            }
        }
    });
};

const findPendingRequestByUserIdAndGroupId = async ({ groupId, userId }) => {
    return await prisma.joinRequest.findFirst({
        where: {
            groupId,
            userId,
            status: "PENDING"
        }
    });
};

const isMember = async ({ groupId, userId }) => {
    return await prisma.groupMember.findUnique({
        where: {
            groupId_userId: {
                groupId,
                userId
            }
        }
    });
};

const findGroupRequests = async (groupId) => {
    return await prisma.joinRequest.findMany({
        where: {
            groupId
        },
        include: {
            user: true
        }
    });
};

const findUserRequests = async (userId) => {
    return await prisma.joinRequest.findMany({
        where: {
            userId
        },
        include: {
            group: true
        }
    });
};

const deleteRequest = async (requestId) => {
    return await prisma.joinRequest.delete({
        where: {
            id: requestId
        }
    });
};

module.exports = {
    createRequest,
    getGroupRequests,
    findRequest,
    findById,
    updateStatus,
    findRequestByUserIdAndGroupId,
    addMember,
    removeMember,
    findPendingRequestByUserIdAndGroupId,
    isMember,
    findGroupRequests,
    findUserRequests,
    deleteRequest
};
