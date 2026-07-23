const z = require("zod");

const blockUserSchema = z.object({
    body: z.object({
        blockedId: z.number().int().positive("Blocked User ID is required")
    })
});

module.exports = {
    blockUserSchema
};