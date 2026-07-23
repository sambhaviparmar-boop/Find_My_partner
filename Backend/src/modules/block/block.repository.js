const prisma = require("../../core/config/prisma");

const blockUser = async ({ blockerId, blockedId }) => {
    return await prisma.block.create({
        data: {
            blockerId: Number(blockerId),
            blockedUserId: Number(blockedId)
        }
    });
};

const unblockUser = async ({ blockerId, blockedId }) => {
    return await prisma.block.delete({
        where: {
            blockerId_blockedUserId: {
                blockerId: Number(blockerId),
                blockedUserId: Number(blockedId)
            }
        }
    });
};

const getAllBlocks = async (blockerId) => {
    return await prisma.block.findMany({
        where: {
            blockerId: Number(blockerId)
        },
        include: {
            blockedUser: true
        }
    });
};

module.exports = {
    blockUser,
    unblockUser,
    getAllBlocks
};