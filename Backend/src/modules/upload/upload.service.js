const multer = require('multer');
const { uploadToCloudinary } = require('../../core/services/cloudinary.service');
const uploadRepository = require('./upload.repository');
const ApiError = require('../../core/utils/apiError');

const uploadTypeConfig = {
  PROFILE_IMAGE: { folder: 'find-my-partner/profile-images', allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'], maxSize: 5 * 1024 * 1024 },
  CHAT_IMAGE: { folder: 'find-my-partner/chat-images', allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'], maxSize: 5 * 1024 * 1024 },
  RESUME: { folder: 'find-my-partner/resumes', allowedExtensions: ['.pdf', '.doc', '.docx'], maxSize: 10 * 1024 * 1024 },
  TEAM_LOGO: { folder: 'find-my-partner/team-logos', allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'], maxSize: 5 * 1024 * 1024 },
  PROJECT_IMAGE: { folder: 'find-my-partner/project-images', allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'], maxSize: 5 * 1024 * 1024 },
  DOCUMENT: { folder: 'find-my-partner/documents', allowedExtensions: ['.pdf', '.doc', '.docx', '.txt'], maxSize: 10 * 1024 * 1024 }
};

const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

const uploadSingleFileService = async ({ userId, file, uploadType }) => {
  if (!file) {
    throw new ApiError(400, 'File is required');
  }

  if (!uploadType) {
    throw new ApiError(400, 'Upload type is required');
  }

  const normalizedType = String(uploadType).trim().toUpperCase();
  const config = uploadTypeConfig[normalizedType];
  if (!config) {
    throw new ApiError(400, 'Invalid upload type');
  }

  const ext = '.' + (file.originalname.split('.').pop() || '').toLowerCase();
  if (!config.allowedExtensions.includes(ext)) {
    throw new ApiError(400, 'File extension not allowed for this upload type');
  }

  if (file.size > config.maxSize) {
    throw new ApiError(400, 'File size exceeds the allowed limit');
  }

  const uploadResult = await uploadToCloudinary(file.buffer, {
    folder: config.folder,
    resource_type: 'auto'
  });

  const uploadRecord = await uploadRepository.createUploadRecord({
    userId: Number(userId),
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    type: uploadType
  });

  return {
    id: uploadRecord.id,
    url: uploadRecord.url,
    publicId: uploadRecord.publicId,
    type: uploadRecord.type
  };
};

module.exports = {
  uploadSingleFileService,
  uploadMiddleware
};
