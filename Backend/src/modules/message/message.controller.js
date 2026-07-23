const messageService = require("./message.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");

const createMessageController = asyncHandler(async (req, res) => {
    const { content, chatId, senderId, receiverId } = req.body;
    const message = await messageService.createMessageService({ content, chatId, senderId, receiverId });
    return res.status(201).json(new ApiResponse(201, message, "Message created successfully"));
});

const getAllMessagesController = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const messages = await messageService.getAllMessagesService(chatId);
    return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

const deleteMessageController = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const message = await messageService.deleteMessageService(messageId);
    return res.status(200).json(new ApiResponse(200, message, "Message deleted successfully"));
});

const updateMessageController = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const { content, chatId, senderId, receiverId } = req.body;
    const message = await messageService.updateMessageService(messageId, { content, chatId, senderId, receiverId });
    return res.status(200).json(new ApiResponse(200, message, "Message updated successfully"));
});

const getUnreadCountController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const count = await messageService.getUnreadCountService(userId);
    return res.status(200).json(new ApiResponse(200, { unreadCount: count }, "Unread count fetched successfully"));
});

module.exports = {
    createMessageController,
    getAllMessagesController,
    deleteMessageController,
    updateMessageController,
    getUnreadCountController
};
