const z = require("zod")

const createReviewSchema = z.object({
     
    reviewerId: z.number(),
    revieweeId: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(500)
})

    const updateReviewSchema = z.object({
    id: z.number(),
    content: z.string().min(1).max(500),
    rating: z.number().min(1).max(5)
})

    const deleteReviewSchema = z.object({
    id: z.number()
})

const getUserReviewsSchema = z.object({
    userId: z.number()
})

const getUserGivenReviewsSchema = z.object({
    userId: z.number()
})


module.exports = {
    createReviewSchema,
    updateReviewSchema,
    deleteReviewSchema,
    getUserReviewsSchema,
    getUserGivenReviewsSchema   
}
