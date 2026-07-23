const prisma = require('../../core/config/prisma');

const createProfile = async (data) => {
  return prisma.networkingProfile.create({ data });
};

const getByUserId = async (userId) => {
  return prisma.networkingProfile.findUnique({
    where: { userId: Number(userId) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: {
              avatar: true,
              city: true,
              college: true
            }
          }
        }
      }
    }
  });
};

const updateProfile = async (userId, data) => {
  return prisma.networkingProfile.update({
    where: { userId: Number(userId) },
    data
  });
};

const findManyProfiles = async (filters = {}) => {
  const where = {};

  if (filters.industry) {
    where.industry = { contains: filters.industry, mode: 'insensitive' };
  }

  if (filters.location) {
    where.location = { contains: filters.location, mode: 'insensitive' };
  }

  if (filters.availability) {
    where.availability = { contains: filters.availability, mode: 'insensitive' };
  }

  if (filters.experience) {
    where.experience = Number(filters.experience);
  }

  if (filters.skills && filters.skills.length) {
    where.user = {
      userSkills: {
        some: {
          skill: {
            name: { in: filters.skills }
          }
        }
      }
    };
  }

  return prisma.networkingProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              avatar: true,
              city: true,
              college: true
            }
          },
          userSkills: {
            include: {
              skill: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

module.exports = {
  createProfile,
  getByUserId,
  updateProfile,
  findManyProfiles
};
