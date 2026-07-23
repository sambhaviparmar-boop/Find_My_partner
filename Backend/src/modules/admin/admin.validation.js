const z = require("zod");


const getAllUsersSchema = z.object({
    query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        search: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.string().optional()
    })
});

const getUserByIdSchema = z.object({
    params: z.object({
        id: z.string().optional()
    })
});

const deleteUserSchema = z.object({
    params: z.object({
        id: z.string().optional()
    })
});

const updateUserschema = z.object({
    params: z.object({
        id: z.string().optional()
    }),
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        role: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        isVerified: z.boolean().optional(),
        profilePicture: z.string().optional()
    })
});

const countUsersSchema = z.object({
    query: z.object({})
});

const getAllTeamsSchema = z.object({
    query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        search: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.string().optional()
    })
});

const getTeamByIdSchema = z.object({
    params: z.object({
        id: z.string().optional()
    })
});

const deleteTeamSchema = z.object({
    params: z.object({
        id: z.string().optional()
    })
});

const updateTeamSchema = z.object({
    params: z.object({
        id: z.string().optional()
    }),
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        vertical: z.string().optional(),
        maxMembers: z.number().optional(),
        isPublic: z.boolean().optional()
    })
});

const countTeamsSchema = z.object({
    query: z.object({})
});


module.exports = {
    getAllUsersSchema,
    getUserByIdSchema,
    deleteUserSchema,
    updateUserschema,
    countUsersSchema,
    getAllTeamsSchema,
    getTeamByIdSchema,
    deleteTeamSchema,
    updateTeamSchema,
    countTeamsSchema
}