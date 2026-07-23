const asyncHandler = require('../../core/utils/asyncHandler');
const ApiResponse = require('../../core/utils/apiResponce');
const networkingService = require('./networking.service');

const createProfile = asyncHandler(async (req, res) => {
  const profile = await networkingService.createProfileService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(201).json(new ApiResponse(201, profile, 'Networking profile created successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await networkingService.updateProfileService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(200).json(new ApiResponse(200, profile, 'Networking profile updated successfully'));
});

const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await networkingService.getMyProfileService(req.user.id);
  return res.status(200).json(new ApiResponse(200, profile, 'Networking profile fetched successfully'));
});

const discoverProfessionals = asyncHandler(async (req, res) => {
  const profiles = await networkingService.discoverProfessionalsService(req.user.id, req.query);
  return res.status(200).json(new ApiResponse(200, profiles, 'Professionals discovered successfully'));
});

const connectWithUser = asyncHandler(async (req, res) => {
  const connection = await networkingService.connectWithUserService({
    senderId: req.user.id,
    receiverId: Number(req.params.userId),
    message: req.body.message,
    category: 'NETWORKING'
  });

  return res.status(201).json(new ApiResponse(201, connection, 'Connection request sent successfully'));
});

module.exports = {
  createProfile,
  updateProfile,
  getMyProfile,
  discoverProfessionals,
  connectWithUser
};
