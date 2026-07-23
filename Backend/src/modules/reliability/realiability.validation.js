const z = require("zod")

const createReliabilitySchema = z.object({
    body: z.object({
        userId: z.number(),
        category: z.string(),
        totalConnections: z.number(),
        successfulConnections: z.number(),
        completedCollaborations: z.number(),
        responseRate: z.number(),
        reviewsCount: z.number()
    })
})

const updateReliabilitySchema = z.object({
    body: z.object({
        userId: z.number(),
        category: z.string(),
        totalConnections: z.number(),
        successfulConnections: z.number(),
        completedCollaborations: z.number(),
        responseRate: z.number(),
        reviewsCount: z.number()
    })
})

const deleteReliabilitySchema = z.object({
    params: z.object({
        userId: z.string()
    })
})

const getReliabilitySchema = z.object({
    params: z.object({
        userId: z.string()
    })
})

module.exports = {
    createReliabilitySchema,
    updateReliabilitySchema,
    deleteReliabilitySchema,
    getReliabilitySchema
}
    