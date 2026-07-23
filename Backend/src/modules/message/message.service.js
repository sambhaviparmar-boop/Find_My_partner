const ApiError = require("../../core/utils/apiError");
const messageRepo = require("./message.repository");

const createMessageService = async ({ content, chatId, senderId, receiverId }) => {
    if (!content || !chatId || !senderId || !receiverId) {
        throw new ApiError(400, "All fields are required");
    }   
    return await messageRepo.createMessageRepo({
        content,
        chatId: Number(chatId),
        senderId: Number(senderId),
        receiverId: Number(receiverId)
    });
};

const getAllMessagesService = async (chatId) => {
    if (!chatId) {
        throw new ApiError(400, "Chat ID is required");
    }
    return await messageRepo.getAllMessagesRepo(Number(chatId));
};

const deleteMessageService = async (messageId) => {
    if (!messageId) {
        throw new ApiError(400, "Message ID is required");
    }
    return await messageRepo.deleteMessageRepo(Number(messageId));
};

const updateMessageService = async (messageId, data) => {
    if (!messageId) {
        throw new ApiError(400, "Message ID is required");
    }
    return await messageRepo.updateMessageRepo(Number(messageId), data);
};

const getUnreadCountService = async (userId) => {
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    return await messageRepo.getUnreadCountRepo(Number(userId));
};

module.exports = {
    createMessageService,
    getAllMessagesService,
    deleteMessageService,
    updateMessageService,
    getUnreadCountService
};