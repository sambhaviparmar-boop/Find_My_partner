const prisma = require('../../core/config/prisma');

const createUploadRecord = async ({ userId, url, publicId, type }) => {
  return prisma.upload.create({
    data: {
      userId: Number(userId),
      url,
      publicId,
      type
    }
  });
};

const getUploadsByUserId = async (userId) => {
  return prisma.upload.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: 'desc' }
  });
};

module.exports = {
  createUploadRecord,
  getUploadsByUserId
};
