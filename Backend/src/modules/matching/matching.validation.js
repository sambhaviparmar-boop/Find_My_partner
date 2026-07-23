const z = require("zod")


const getRecommendationsSchema = z.object({
    params: z.object({
        userId: z.string()
    })
});

const getRecommendationByIdSchema = z.object({
    params: z.object({
        userId: z.string()
    })
});
const acceptMatchSchema = z.object({
    params: z.object({
        matchId: z.string()
    })
});
const rejectMatchSchema = z.object({
    params: z.object({
        matchId: z.string()
    })
});
const getConnectionsSchema = z.object({
    params: z.object({
        userId: z.string()
    })
});

module.exports ={
    getRecommendationsSchema,
    getRecommendationByIdSchema,
    acceptMatchSchema,
    rejectMatchSchema,
    getConnectionsSchema
}






