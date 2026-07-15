
const prisma = require("../../core/config/prisma")
const asyncHandler = require("../../core/utils/asyncHandler")

const createUser = async(data) => {
    const user = await prisma.user.create({ data })
    return user
}   

const findByEmail = async(email) => {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
}


const createOrupdateUser =async(data) => {
    const user = await prisma.user.upsert({
        where: { email: data.email },
        update: data,
        create: data
    })
    return user
}       

const findById = async(id) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
}

const updateToken = async(id, refreshToken) => {
    const user = await prisma.user.update({
        where: { id },
        data: { refreshToken }
    })
    return user
}


module.exports = {
    createUser,
    findByEmail,
    createOrupdateUser,
    findById,
    updateToken
}