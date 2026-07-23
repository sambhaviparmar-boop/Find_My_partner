const notificationService = require("./notification.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiError = require("../../core/utils/apiError");
const ApiResponse = require("../../core/utils/apiResponce");

const createNotificationController = asyncHandler(async (req, res) => {
    const { userId, type, content, title } = req.body;
    if (!userId || !type || !content) {
        throw new ApiError(400, "Notification data is required");
    }
    const notification = await notificationService.createNotificationService({ userId, type, content, title: title || type });
    return res.status(201).json(new ApiResponse(201, notification, "Notification created successfully"));
});

const getAllNotificationsController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const notifications = await notificationService.getAllNotificationsService(userId);
    return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

const updateNotificationController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const notification = await notificationService.updateNotificationService(id, data);
    return res.status(200).json(new ApiResponse(200, notification, "Notification updated successfully"));
});

const deleteNotificationController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notification = await notificationService.deleteNotificationService(id);
    return res.status(200).json(new ApiResponse(200, notification, "Notification deleted successfully"));
});

module.exports = {
    createNotificationController,
    getAllNotificationsController,
    updateNotificationController,
    deleteNotificationController
};
