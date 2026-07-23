const z = require("zod");

const createTeamValidation = z.object({
    body: z.object({
        name: z.string().min(3, "Team name must be at least 3 characters"),
        description: z.string().optional(),
        hackathonId: z.number().int().positive().optional()
    })
});

const updateTeamValidation = z.object({
    body: z.object({
        name: z.string().min(3).optional(),
        description: z.string().optional(),
        hackathonId: z.number().int().positive().optional()
    })
});

const deleteTeamValidation = z.object({
    params: z.object({
        teamId: z.string()
    })
});

const getAllTeamsValidation = z.object({
    query: z.object({
        page: z.string().optional(),
        limit: z.string().optional()
    })
});

const getTeamByIdValidation = z.object({
    params: z.object({
        teamId: z.string()
    })
});

module.exports = {
    createTeamValidation,
    updateTeamValidation,
    deleteTeamValidation,
    getAllTeamsValidation,
    getTeamByIdValidation
};
