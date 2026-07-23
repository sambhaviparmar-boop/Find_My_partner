const z = require("zod")


const findSimilarUsersSchema = z.object({
    params: z.object({
        userId: z.string()
    })
})

module.exports = {
    findSimilarUsersSchema
}
    