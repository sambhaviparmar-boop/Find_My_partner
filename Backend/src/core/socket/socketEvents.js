const prisma = require("../config/prisma");
const onlineUsers = require("./onlineUsers");
const roomManager = require("./roomManager");
const { sendNotification } = require("./notificationEmitter");

const registerSocketEvents = (io, socket) => {
    const userId = Number(socket.user.id);
    
    console.log(`Socket client connected: ${socket.id} (user: ${userId})`);

    // 1. Manage Presence (Online)
    const handleConnectionPresence = async () => {
        const wasOffline = !(await onlineUsers.isOnline(userId));
        await onlineUsers.addUser(userId, socket.id);
        
        // Auto join chat & group rooms
        await roomManager.joinUserRooms(socket);

        if (wasOffline) {
            // Broadcast user online presence to other sockets
            socket.broadcast.emit("user:online", { userId, lastSeen: new Date() });
            console.log(`User presence broadcast: User ${userId} is now online`);
        }
    };
    handleConnectionPresence().catch(console.error);

    // 2. Messaging Events
    
    // message:send
    socket.on("message:send", async (payload, callback) => {
        try {
            const { chatId, content } = payload;
            if (!chatId || !content) {
                if (callback) callback({ success: false, error: "Missing fields" });
                return;
            }

            // Verify room/chat membership
            const chat = await prisma.chat.findUnique({
                where: { id: Number(chatId) },
                select: { senderId: true, receiverId: true }
            });

            if (!chat || (chat.senderId !== userId && chat.receiverId !== userId)) {
                if (callback) callback({ success: false, error: "Unauthorized access to chat" });
                return;
            }

            // Create message in database
            const message = await prisma.message.create({
                data: {
                    chatId: Number(chatId),
                    senderId: userId,
                    content,
                    isRead: false
                }
            });

            const chatRoom = `chat:${chatId}`;
            
            // Broadcast message:receive to room (excluding sender)
            socket.to(chatRoom).emit("message:receive", message);

            // Determine if receiver is online
            const receiverId = chat.senderId === userId ? chat.receiverId : chat.senderId;
            const receiverSocketIds = await onlineUsers.getSocketIds(receiverId);

            if (receiverSocketIds.length > 0) {
                // If online, update deliveredAt and emit message:delivered
                const updatedMsg = await prisma.message.update({
                    where: { id: message.id },
                    data: { deliveredAt: new Date() }
                });
                io.to(chatRoom).emit("message:delivered", { messageId: message.id, chatId, deliveredAt: updatedMsg.deliveredAt });
            } else {
                // Trigger offline push notification
                await sendNotification(io, {
                    userId: receiverId,
                    type: "NEW_MESSAGE",
                    content: `New message from ${socket.user.username || "User"}: ${content.substring(0, 30)}...`,
                    title: "New Message"
                });
            }

            if (callback) callback({ success: true, data: message });
        } catch (error) {
            console.error("Error in message:send:", error);
            if (callback) callback({ success: false, error: "Server error" });
        }
    });

    // message:delivered
    socket.on("message:delivered", async (payload) => {
        try {
            const { messageId } = payload;
            if (!messageId) return;

            const updatedMsg = await prisma.message.update({
                where: { id: Number(messageId) },
                data: { deliveredAt: new Date() }
            });

            io.to(`chat:${updatedMsg.chatId}`).emit("message:delivered", {
                messageId: updatedMsg.id,
                chatId: updatedMsg.chatId,
                deliveredAt: updatedMsg.deliveredAt
            });
        } catch (e) {
            console.error("Error setting message delivered status:", e);
        }
    });

    // message:seen
    socket.on("message:seen", async (payload) => {
        try {
            const { chatId } = payload;
            if (!chatId) return;

            // Mark all unread messages from the other user in this chat as read
            const now = new Date();
            await prisma.message.updateMany({
                where: {
                    chatId: Number(chatId),
                    senderId: { not: userId },
                    isRead: false
                },
                data: {
                    isRead: true,
                    seenAt: now
                }
            });

            // Notify everyone in room that messages are seen
            io.to(`chat:${chatId}`).emit("message:seen", { chatId, seenAt: now, seenBy: userId });
        } catch (e) {
            console.error("Error in message:seen status update:", e);
        }
    });

    // message:edit
    socket.on("message:edit", async (payload, callback) => {
        try {
            const { messageId, content } = payload;
            if (!messageId || !content) {
                if (callback) callback({ success: false, error: "Missing fields" });
                return;
            }

            const message = await prisma.message.findUnique({
                where: { id: Number(messageId) }
            });

            if (!message || message.senderId !== userId) {
                if (callback) callback({ success: false, error: "Unauthorized operation" });
                return;
            }

            const updatedMsg = await prisma.message.update({
                where: { id: Number(messageId) },
                data: { content }
            });

            io.to(`chat:${message.chatId}`).emit("message:edit", updatedMsg);
            if (callback) callback({ success: true, data: updatedMsg });
        } catch (e) {
            console.error("Error in message:edit:", e);
            if (callback) callback({ success: false, error: "Server error" });
        }
    });

    // message:delete
    socket.on("message:delete", async (payload, callback) => {
        try {
            const { messageId } = payload;
            if (!messageId) {
                if (callback) callback({ success: false, error: "Missing fields" });
                return;
            }

            const message = await prisma.message.findUnique({
                where: { id: Number(messageId) }
            });

            if (!message || message.senderId !== userId) {
                if (callback) callback({ success: false, error: "Unauthorized operation" });
                return;
            }

            await prisma.message.delete({
                where: { id: Number(messageId) }
            });

            io.to(`chat:${message.chatId}`).emit("message:delete", { messageId: message.id });
            if (callback) callback({ success: true });
        } catch (e) {
            console.error("Error in message:delete:", e);
            if (callback) callback({ success: false, error: "Server error" });
        }
    });

    // 3. Typing Indicators
    socket.on("typing:start", (payload) => {
        const { roomId } = payload;
        if (roomId) {
            socket.to(roomId).emit("typing:start", { roomId, userId });
        }
    });

    socket.on("typing:stop", (payload) => {
        const { roomId } = payload;
        if (roomId) {
            socket.to(roomId).emit("typing:stop", { roomId, userId });
        }
    });

    // 4. Disconnect Presence
    socket.on("disconnect", async () => {
        console.log(`Socket client disconnected: ${socket.id} (user: ${userId})`);
        
        await onlineUsers.removeUser(userId, socket.id);
        roomManager.leaveUserRooms(socket);

        // Check if user has no remaining online devices
        const stillOnline = await onlineUsers.isOnline(userId);
        if (!stillOnline) {
            const lastSeen = new Date();
            // Broadcast offline status
            socket.broadcast.emit("user:offline", { userId, lastSeen });
            console.log(`User presence broadcast: User ${userId} is offline`);
        }
    });
};

module.exports = {
    registerSocketEvents
};
