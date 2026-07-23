const cloudinary = require('cloudinary').v2;
const ApiError = require('../utils/apiError');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (fileBuffer, options = {}) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        folder: options.folder || 'find-my-partner',
        ...options
      }, (error, uploaded) => {
        if (error) {
          reject(new ApiError(500, 'Cloudinary upload failed'));
          return;
        }
        resolve(uploaded);
      });

      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new ApiError(500, 'Cloudinary upload failed');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    return cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ApiError(500, 'Cloudinary delete failed');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};
