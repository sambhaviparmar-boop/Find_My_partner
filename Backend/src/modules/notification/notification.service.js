const notificationRepo = require("./notification.repository");
const ApiError = require("../../core/utils/apiError");

const createNotificationService = async(data) => {
    if (!data) {
        throw new ApiError(400, "Notification data is required");
    }
    return await notificationRepo.createNotification({
        ...data,
        userId: Number(data.userId)
    });
};

const getAllNotificationsService = async(userId) => {
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    const notifications = await notificationRepo.getAllNotifications(Number(userId));
    return notifications || [];
};

const updateNotificationService = async(id, data) => {
    if (!id) {
        throw new ApiError(400, "Notification ID is required");
    }
    return await notificationRepo.updateNotification(Number(id), data);
};

const deleteNotificationService = async(id) => {
    if (!id) {
        throw new ApiError(400, "Notification ID is required");
    }
    return await notificationRepo.deleteNotification(Number(id));
};

module.exports = {
    createNotificationService,
    getAllNotificationsService,
    updateNotificationService,
    deleteNotificationService
};
