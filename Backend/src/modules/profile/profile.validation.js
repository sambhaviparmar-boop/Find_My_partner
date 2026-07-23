const z = require("zod");

const createProfileSchema = z.object({
    body: z.object({
        bio: z.string().min(10),
        avatar: z.string().url(),
        location: z.string(),
        college: z.string(),
        branch: z.string(),
        year: z.number().min(1).max(5),
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        leetcode: z.string().url().optional(),
        portfolio: z.string().url().optional()
    })
});

const updateProfileSchema = z.object({
    body: z.object({
        bio: z.string().min(10).optional(),
        avatar: z.string().url().optional(),
        location: z.string().optional(),
        college: z.string().optional(),
        branch: z.string().optional(),
        year: z.number().optional(),
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        leetcode: z.string().url().optional(),
        portfolio: z.string().url().optional()
    })
});

const getProfileSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

const getProfileByUsernameSchema = z.object({
    params: z.object({
        username: z.string()
    })
});

const getProfileByIdSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

const deleteProfileSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

const getAllProfileSchema = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional()
    })
});

module.exports = {
    createProfileSchema,
    updateProfileSchema,
    getProfileSchema,
    getProfileByUsernameSchema,
    getProfileByIdSchema,
    deleteProfileSchema,
    getAllProfileSchema
};
