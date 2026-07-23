const prisma = require("../config/prisma");

const joinUserRooms = async (socket) => {
    const userId = Number(socket.user.id);

    // 1. Join personal room
    const personalRoom = `user:${userId}`;
    socket.join(personalRoom);
    console.log(`Socket ${socket.id} joined personal room ${personalRoom}`);

    // 2. Fetch and join all private chats
    try {
        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            select: { id: true }
        });
        chats.forEach(chat => {
            const chatRoom = `chat:${chat.id}`;
            socket.join(chatRoom);
            console.log(`Socket ${socket.id} joined chat room ${chatRoom}`);
        });
    } catch (e) {
        console.error("Error joining chat rooms on socket connection:", e);
    }

    // 3. Fetch and join all team/group chats
    try {
        // Find teams this user belongs to
        const teamMembers = await prisma.teamMember.findMany({
            where: { userId },
            select: { teamId: true }
        });
        teamMembers.forEach(member => {
            const teamRoom = `team:${member.teamId}`;
            socket.join(teamRoom);
            console.log(`Socket ${socket.id} joined team room ${teamRoom}`);
        });

        // Find groups this user belongs to
        const groupMembers = await prisma.groupMember.findMany({
            where: { userId },
            select: { groupId: true }
        });
        groupMembers.forEach(member => {
            const groupRoom = `group:${member.groupId}`;
            socket.join(groupRoom);
            console.log(`Socket ${socket.id} joined group room ${groupRoom}`);
        });
    } catch (e) {
        console.error("Error joining group/team rooms on socket connection:", e);
    }
};

const leaveUserRooms = (socket) => {
    // Socket.IO automatically removes a socket from all rooms on disconnect,
    // but we can log or perform custom room-cleanup operations here if necessary.
    console.log(`Socket ${socket.id} left all rooms`);
};

module.exports = {
    joinUserRooms,
    leaveUserRooms
};
