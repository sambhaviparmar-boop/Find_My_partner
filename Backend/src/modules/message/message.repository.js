const prisma = require("../../core/config/prisma");

const createMessageRepo = async ({ chatId, senderId, content }) => {
    return await prisma.message.create({
        data: {
            chatId: Number(chatId),
            senderId: Number(senderId),
            content
        }
    });
};

const getAllMessagesRepo = async (chatId) => {
    return await prisma.message.findMany({
        where: {
            chatId: Number(chatId)
        },
        include: {
            sender: true,
            chat: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });
};

const deleteMessageRepo = async (messageId) => {
    return await prisma.message.delete({
        where: {
            id: Number(messageId)
        }
    });
};

const updateMessageRepo = async (messageId, data) => {
    return await prisma.message.update({
        where: {
            id: Number(messageId)
        },
        data: {
            content: data.content
        },
        include: {
            sender: true,
            chat: true
        }
    });
};

const getUnreadCountRepo = async (userId) => {
    return await prisma.message.count({
        where: {
            chat: {
                OR: [
                    { senderId: Number(userId) },
                    { receiverId: Number(userId) }
                ]
            },
            senderId: { not: Number(userId) },
            isRead: false
        }
    });
};

module.exports = {
    createMessageRepo,
    getAllMessagesRepo,
    deleteMessageRepo,
    updateMessageRepo,
    getUnreadCountRepo
};