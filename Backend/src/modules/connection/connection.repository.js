const prisma = require("../../core/config/prisma");

// Create Connection Request
const createConnectionRepo = async (data) => {
    return await prisma.connection.create({
        data
    });
};

// Get Connection By Id
const getConnectionByIdRepo = async (id) => {
    return await prisma.connection.findUnique({
        where: {
            id
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            receiver: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
};

// Get Sent Connections
const getSentConnectionsRepo = async (userId) => {
    return await prisma.connection.findMany({
        where: {
            senderId: userId
        },
        include: {
            receiver: {
                select: {
                    id: true,
                    name: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    });
};

// Get Received Connections
const getReceivedConnectionsRepo = async (userId) => {
    return await prisma.connection.findMany({
        where: {
            receiverId: userId
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    });
};

// Update Connection Status
const updateConnectionStatusRepo = async (id, status) => {
    return await prisma.connection.update({
        where: {
            id
        },
        data: {
            status
        }
    });
};

// Delete Connection
const deleteConnectionRepo = async (id) => {
    return await prisma.connection.delete({
        where: {
            id
        }
    });
};

// Check Existing Connection
const findConnectionBetweenUsersRepo = async (senderId, receiverId, category) => {
    return await prisma.connection.findFirst({
        where: {
            senderId,
            receiverId,
            category
        }
    });
};

module.exports = {
    createConnectionRepo,
    getConnectionByIdRepo,
    getSentConnectionsRepo,
    getReceivedConnectionsRepo,
    updateConnectionStatusRepo,
    deleteConnectionRepo,
    findConnectionBetweenUsersRepo
};