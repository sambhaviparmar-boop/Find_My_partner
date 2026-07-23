const asyncHandler = require('../../core/utils/asyncHandler');
const ApiResponse = require('../../core/utils/apiResponce');
const uploadService = require('./upload.service');

const uploadFile = asyncHandler(async (req, res) => {
  const file = req.file;
  const uploadType = req.body?.uploadType || req.body?.type || req.query?.uploadType || req.headers['x-upload-type'];

  console.log('upload request debug', {
    body: req.body,
    headers: req.headers,
    file: file ? { originalname: file.originalname, size: file.size } : null,
    uploadType
  });

  const result = await uploadService.uploadSingleFileService({
    userId: req.user.id,
    file,
    uploadType
  });

  return res.status(201).json(new ApiResponse(201, result, 'File uploaded successfully'));
});

module.exports = {
  uploadFile
};
