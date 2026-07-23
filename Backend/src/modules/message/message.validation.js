const z= require("zod")

const createMessageValidation = z.object({
    content: z.string().min(1,"Message cannot be empty"),
    chatId: z.string().min(1,"Chat ID is required"),
    senderId: z.string().min(1,"Sender ID is required"),
    receiverId: z.string().min(1,"Receiver ID is required")
})

const getAllMessagesValidation = z.object({
    chatId: z.string().min(1,"Chat ID is required")
})

const deleteMessageValidation = z.object({
    messageId: z.string().min(1,"Message ID is required")
})

const updateMessageValidation = z.object({
    messageId: z.string().min(1,"Message ID is required"),
    content: z.string().min(1,"Message cannot be empty")
})

module.exports = {
    createMessageValidation,
    getAllMessagesValidation,
    deleteMessageValidation,
    updateMessageValidation
}   
