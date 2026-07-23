const z = require("zod")



const createReportSchema = z.object({
    body: z.object({
        reporterId: z.string(),
        reportedUserId: z.string(),
        reason: z.string(),
        description: z.string()
    })
})

const getReportByIdSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

const deleteReportSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

const updateReportStatusSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        status: z.string()
    })
})

module.exports = {
    createReportSchema,
    getReportByIdSchema,
    deleteReportSchema,
    updateReportStatusSchema
}
    