const prisma = require('../../core/config/prisma');

const createPreference = async (data) => {
  return prisma.shoppingPreference.create({ data });
};

const getByUserId = async (userId) => {
  return prisma.shoppingPreference.findUnique({ where: { userId: Number(userId) } });
};

const updatePreference = async (userId, data) => {
  return prisma.shoppingPreference.update({
    where: { userId: Number(userId) },
    data
  });
};

const findMatches = async (userId, filters = {}) => {
  const current = await prisma.shoppingPreference.findUnique({ where: { userId: Number(userId) } });
  if (!current) return [];

  return prisma.shoppingPreference.findMany({
    where: {
      userId: { not: Number(userId) },
      ...(filters.category ? { categories: { has: filters.category } } : {}),
      ...(filters.location ? { preferredLocation: { contains: filters.location, mode: 'insensitive' } } : {}),
      ...(filters.shoppingType ? { shoppingType: { contains: filters.shoppingType, mode: 'insensitive' } } : {})
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
  createPreference,
  getByUserId,
  updatePreference,
  findMatches
};
