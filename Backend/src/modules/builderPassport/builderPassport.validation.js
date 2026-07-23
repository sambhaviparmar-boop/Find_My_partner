const z = require("zod")

const createBuilderPassportValidation = z.object({
    github: z.string().url("Invalid github url").optional(),
    linkedin: z.string().url("Invalid linkedin url").optional(),
    leetcode: z.string().url("Invalid leetcode url").optional(),
    codeforces: z.string().url("Invalid codeforces url").optional(),
    portfolio: z.string().url("Invalid portfolio url").optional(),
})

const updateBuilderPassportValidation = z.object({
    github: z.string().url("Invalid github url").optional(),
    linkedin: z.string().url("Invalid linkedin url").optional(),
    leetcode: z.string().url("Invalid leetcode url").optional(),
    codeforces: z.string().url("Invalid codeforces url").optional(),
    portfolio: z.string().url("Invalid portfolio url").optional(),
})

module.exports = {
    createBuilderPassportValidation,
    updateBuilderPassportValidation
    
}   