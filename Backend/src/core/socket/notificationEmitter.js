const notificationRepo = require("../../modules/notification/notification.repository");
const onlineUsers = require("./onlineUsers");

const sendNotification = async (io, { userId, type, content, title }) => {
    try {
        // 1. Persist notification in database first
        const notification = await notificationRepo.createNotification({
            userId: Number(userId),
            type,
            content,
            title: title || type,
            isRead: false
        });

        // 2. Check if user is online
        const socketIds = await onlineUsers.getSocketIds(userId);
        if (socketIds.length > 0) {
            // Emit real-time notification over Socket.IO to the user's personal room
            io.to(`user:${userId}`).emit("notification:receive", notification);
            console.log(`Real-time notification emitted to user:${userId} for type: ${type}`);
        } else {
            console.log(`User ${userId} is offline. Notification saved to DB.`);
        }

        return notification;
    } catch (error) {
        console.error("Error creating/sending real-time notification:", error);
    }
};

module.exports = {
    sendNotification
};
