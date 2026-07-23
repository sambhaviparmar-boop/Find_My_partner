const z = require("zod")

const createInvitationSchema = z.object({
    teamId: z.string(),
    
    receiverId: z.string()
})

const getInvitationByIdSchema = z.object({
    id: z.string()
})

const getInvitationsOfUserSchema = z.object({
    userId: z.string()
})

const getInvitationsOfTeamSchema = z.object({
    teamId: z.string()
})

const updateInvitationSchema = z.object({
    id: z.string(),
    teamId: z.string(),
    receiverId: z.string()
})

const deleteInvitationSchema = z.object({
    id: z.string()
})

module.exports = {
    createInvitationSchema,
    getInvitationByIdSchema,
    getInvitationsOfUserSchema,
    getInvitationsOfTeamSchema,
    updateInvitationSchema,
    deleteInvitationSchema
}
