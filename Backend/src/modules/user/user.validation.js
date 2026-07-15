
const z = require('zod');


const updateUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    bio: z.string(),
    avatar: z.string(),
    location: z.string()
})

const deleteUserSchema = z.object({
    id: z.string(),
})

const getAllUsersSchema = z.object({
    id: z.string(),
})

const getUserByIdSchema = z.object({
    id: z.string(),
})

module.exports = {
    updateUserSchema,
    deleteUserSchema,
    getAllUsersSchema,
    getUserByIdSchema
}       
