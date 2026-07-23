const z= require("zod");
const notificationValidation = z.object({
    userId: z.string(),
    type: z.string(),
    content: z.string()
});

const getAllNotificationsValidation = z.object({
    userId: z.string(),
});

const updateNotificationValidation = z.object({
    id: z.string(),
    data: z.object({
        userId: z.string(),
        type: z.string(),
        content: z.string()
    })
});

const deleteNotificationValidation = z.object({
    id: z.string()
});

module.exports={notificationValidation,getAllNotificationsValidation,updateNotificationValidation,deleteNotificationValidation}
