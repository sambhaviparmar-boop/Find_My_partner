const z = require("zod");


const getChatByIdSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Chat ID is required"),
    })
});

const getChatByParticipantIdsSchema = z.object({

    participantIds: z.array(z.string()).min(1, "Participant IDs are required"),
});

const createChatSchema = z.object({

    senderId: z.string().min(1, "Sender ID is required"),
    receiverId: z.string().min(1, "Receiver ID is required"),
});

const updateChatSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Chat ID is required"),
    }),
    body: z.object({
        chatData: z.object({}).optional(),
    }),
});

const deleteChatSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Chat ID is required"),
    })
});

module.exports = {
    getChatByIdSchema,
    getChatByParticipantIdsSchema,
    createChatSchema,
    updateChatSchema,
    deleteChatSchema,
};
