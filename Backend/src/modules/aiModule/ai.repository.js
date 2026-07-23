const prisma = require("../../core/config/prisma");
const ApiError = require("../../core/utils/apiError");

const findSimilarUsers = async (userSkills, userInterests, userId, limit = 10) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                id: { not: Number(userId) }
            },
            take: limit,
            select: {
                id: true,
                username: true,
                email: true,
                profile: true
            }
        });
        return users.map(u => ({ userId: u.id, user: u, score: 85 }));
    } catch (error) {
        throw new ApiError(500, "Failed to find similar users");
    }
};

module.exports = {
    findSimilarUsers
};
