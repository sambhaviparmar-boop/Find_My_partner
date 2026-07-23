const prisma = require('../../core/config/prisma');

const createProfile = async (data) => {
  return prisma.datingProfile.create({ data });
};

const getByUserId = async (userId) => {
  return prisma.datingProfile.findUnique({ where: { userId: Number(userId) } });
};

const updateProfile = async (userId, data) => {
  return prisma.datingProfile.update({
    where: { userId: Number(userId) },
    data
  });
};

const findMatches = async (userId, filters = {}) => {
  const current = await prisma.datingProfile.findUnique({ where: { userId: Number(userId) } });
  if (!current) return [];

  return prisma.datingProfile.findMany({
    where: {
      userId: { not: Number(userId) },
      ...(filters.interests ? { interests: { hasSome: filters.interests.split(',').map((item) => item.trim()).filter(Boolean) } } : {}),
      ...(filters.location ? { location: { contains: filters.location, mode: 'insensitive' } } : {}),
      ...(filters.gender ? { gender: { equals: filters.gender } } : {})
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              avatar: true,
              city: true
            }
          }
        }
      }
    }
  });
};

module.exports = {
  createProfile,
  getByUserId,
  updateProfile,
  findMatches
};
