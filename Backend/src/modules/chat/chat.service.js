const chatRepo = require("./chat.repository");
const ApiError = require("../../core/utils/apiError");

const getChatByIdService = async (id) => {
    if (!id) {
        throw new ApiError(400, "Chat ID is required");
    }
    const chat = await chatRepo.findById(Number(id));
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }
    return chat;
};

const getChatByParticipantIdsService = async (participantIds) => {
    if (!participantIds || !Array.isArray(participantIds)) {
        throw new ApiError(400, "Participant IDs must be an array");
    }
    const numericIds = participantIds.map(Number);
    const chat = await chatRepo.findByParticipantIds(numericIds);
    return chat;
};

const createChatService = async (senderId, receiverId) => {
    if (!senderId || !receiverId) {
        throw new ApiError(400, "Sender ID and Receiver ID are required");
    }
    return await chatRepo.createChat({
        senderId: Number(senderId),
        receiverId: Number(receiverId)
    });
};

const updateChatService = async (id, chatData) => {
    if (!id || !chatData) {
        throw new ApiError(400, "Chat ID and data are required");
    }
    return await chatRepo.updateChat(Number(id), chatData);
};

const deleteChatService = async (id) => {
    if (!id) {
        throw new ApiError(400, "Chat ID is required");
    }
    return await chatRepo.deleteChat(Number(id));
};

module.exports = {
    getChatByIdService,
    getChatByParticipantIdsService,
    createChatService,
    updateChatService,
    deleteChatService
};