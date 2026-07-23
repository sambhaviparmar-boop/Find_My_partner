const prisma = require("../../core/config/prisma")

const createNotification = async (data) => {
    return await prisma.notification.create({
        data
    })
}

const getAllNotifications = async (userId) => {
    return await prisma.notification.findMany({
        where: {
            userId
        },
        orderBy:{
    createdAt:"desc"
}
    })
}

const updateNotification = async (id, data) => {

    return await prisma.notification.update({
        where: {
            id
        },
        data
    })
}

const deleteNotification = async (id) => {

    return await prisma.notification.delete({
        where: {
            id
        }
    })
}


module.exports = {
    createNotification,
    getAllNotifications,
    updateNotification,
    deleteNotification
}   