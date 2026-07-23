const  prisma = require("../../core/config/prisma");

const findById = async (id) => {
    return await prisma.chat.findUnique({
        where: {
            id
        }
    });
}

const findByParticipantIds = async (participantIds) => {
    return await prisma.chat.findMany({
        where: {
            participants: {
                hasSome: participantIds
            }
        }
    });
}

const createChat = async (chat) => {
    return await prisma.chat.create({
        data: chat
    });
}


const updateChat = async (id, chat) => {
    return await prisma.chat.update({
        where: {
            id
        },
        data: chat
    });
}

const deleteChat = async (id) => {
    return await prisma.chat.delete({
        where: {
            id
        }
    });
}




module.exports = {
    findById,
    findByParticipantIds,
    createChat,
    updateChat,
    deleteChat
}   
