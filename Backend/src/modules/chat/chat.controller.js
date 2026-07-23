const chatService = require("./chat.service");
const ApiResponse = require("../../core/utils/apiResponce");
const asyncHandler = require("../../core/utils/asyncHandler");
const onlineUsersManager = require("../../core/socket/onlineUsers");

const getChatByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const chat = await chatService.getChatByIdService(Number(id));
    return res.status(200).json(new ApiResponse(200, chat, "Chat fetched successfully"));
});

const getChatByParticipantIdsController = asyncHandler(async (req, res) => {
    const { participantIds } = req.body;
    const chat = await chatService.getChatByParticipantIdsService(participantIds);
    return res.status(200).json(new ApiResponse(200, chat, "Chat fetched successfully"));
});

const createChatController = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body;
    const chat = await chatService.createChatService(Number(senderId), Number(receiverId));
    return res.status(200).json(new ApiResponse(200, chat, "Chat created successfully"));
});

const updateChatController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { chatData } = req.body;
    const updatedChat = await chatService.updateChatService(Number(id), chatData);
    return res.status(200).json(new ApiResponse(200, updatedChat, "Chat updated successfully"));
});

const deleteChatController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const chat = await chatService.deleteChatService(Number(id));
    return res.status(200).json(new ApiResponse(200, chat, "Chat deleted successfully"));
});

const getOnlineUsersController = asyncHandler(async (req, res) => {
    const userIds = await onlineUsersManager.getOnlineUserIds();
    return res.status(200).json(new ApiResponse(200, userIds, "Online users fetched successfully"));
});

module.exports = {
    getChatByIdController,
    getChatByParticipantIdsController,
    createChatController,
    updateChatController,
    deleteChatController,
    getOnlineUsersController
};
