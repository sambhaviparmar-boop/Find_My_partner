const prisma = require("../../core/config/prisma");

const createGroup = async ({ name, description, vertical, category, maxMembers, isPublic, ownerId }) => {
    return await prisma.group.create({
        data: {
            name,
            description,
            vertical: vertical || category || "GENERAL",
            maxMembers: maxMembers ? Number(maxMembers) : 4,
            isPublic: isPublic !== undefined ? Boolean(isPublic) : true,
            ownerId: Number(ownerId)
        }
    });
};

const updateGroup = async ({ id, name, description, vertical, category, maxMembers, isPublic, ownerId }) => {
    return await prisma.group.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            description,
            vertical: vertical || category || "GENERAL",
            maxMembers: maxMembers ? Number(maxMembers) : undefined,
            isPublic: isPublic !== undefined ? Boolean(isPublic) : undefined,
            ownerId: ownerId ? Number(ownerId) : undefined
        }
    });
};

const deleteGroup = async ({ id }) => {
    return await prisma.group.delete({
        where: {
            id: Number(id)
        }
    });
};

const getAllGroups = async () => {
    return await prisma.group.findMany();
};

const getGroupById = async ({ id }) => {
    return await prisma.group.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const findGroupByName = async ({ name }) => {
    return await prisma.group.findUnique({
        where: {
            name
        }
    });
};

const findById = async ({ id }) => {
    return await prisma.group.findUnique({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    findGroupByName,
    findById
};
