const asyncHandler = require('../../core/utils/asyncHandler');
const ApiResponse = require('../../core/utils/apiResponce');
const datingService = require('./dating.service');

const createProfile = asyncHandler(async (req, res) => {
  const profile = await datingService.createProfileService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(201).json(new ApiResponse(201, profile, 'Dating profile created successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await datingService.updateProfileService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(200).json(new ApiResponse(200, profile, 'Dating profile updated successfully'));
});

const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await datingService.getMyProfileService(req.user.id);
  return res.status(200).json(new ApiResponse(200, profile, 'Dating profile fetched successfully'));
});

const getMatches = asyncHandler(async (req, res) => {
  const matches = await datingService.getMatchesService(req.user.id, req.query);
  return res.status(200).json(new ApiResponse(200, matches, 'Dating matches fetched successfully'));
});

const connectWithUser = asyncHandler(async (req, res) => {
  const connection = await datingService.connectWithUserService({
    senderId: req.user.id,
    receiverId: Number(req.params.userId),
    message: req.body.message
  });

  return res.status(201).json(new ApiResponse(201, connection, 'Dating connection request sent'));
});

module.exports = {
  createProfile,
  updateProfile,
  getMyProfile,
  getMatches,
  connectWithUser
};
