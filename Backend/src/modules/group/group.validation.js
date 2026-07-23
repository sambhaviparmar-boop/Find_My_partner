const z = require("zod");

const groupCreateSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        vertical: z.string().optional(),
        category: z.string().optional(),
        maxMembers: z.number().optional().default(4),
        isPublic: z.boolean().optional().default(true)
    })
}); 

const groupUpdateSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        vertical: z.string().optional(),
        maxMembers: z.number().optional(),
        isPublic: z.boolean().optional()
    })
});

const groupDeleteSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

const groupGetByIdSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

module.exports = {
    groupCreateSchema,
    groupUpdateSchema,
    groupDeleteSchema,
    groupGetByIdSchema
};
