const z = require("zod")

const numericId = z.coerce.number().int().positive();

const createWorkspaceValidation = z.object({
    teamId: numericId,
    description: z.string().optional(),
    githubRepo: z.string().optional(),
    meetingLink: z.string().optional()
})

const getWorkspaceByIdValidation = z.object({
    id: numericId
})

const getWorkspaceByTeamIdValidation = z.object({
    teamId: numericId
})

const updateWorkspaceValidation = z.object({
    id: numericId,
    teamId: numericId,
    description: z.string().optional(),
    githubRepo: z.string().optional(),
    meetingLink: z.string().optional()
})

const deleteWorkspaceValidation = z.object({
    id: numericId
})

module.exports = {
    createWorkspaceValidation,
    getWorkspaceByIdValidation,
    getWorkspaceByTeamIdValidation,
    updateWorkspaceValidation,
    deleteWorkspaceValidation
}   