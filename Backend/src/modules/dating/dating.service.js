const datingRepository = require('./dating.repository');
const connectionService = require('../connection/connection.service');
const ApiError = require('../../core/utils/apiError');

const createProfileService = async ({ userId, bio, interests, gender, location, ageRange }) => {
  const existing = await datingRepository.getByUserId(userId);
  if (existing) {
    throw new ApiError(409, 'Dating profile already exists');
  }

  return datingRepository.createProfile({
    userId: Number(userId),
    bio,
    interests,
    gender,
    location,
    ageRange
  });
};

const updateProfileService = async ({ userId, bio, interests, gender, location, ageRange }) => {
  const existing = await datingRepository.getByUserId(userId);
  if (!existing) {
    throw new ApiError(404, 'Dating profile not found');
  }

  return datingRepository.updateProfile(userId, {
    bio,
    interests,
    gender,
    location,
    ageRange
  });
};

const getMyProfileService = async (userId) => {
  const profile = await datingRepository.getByUserId(userId);
  if (!profile) {
    throw new ApiError(404, 'Dating profile not found');
  }
  return profile;
};

const getMatchesService = async (userId, filters = {}) => {
  return datingRepository.findMatches(userId, filters);
};

const connectWithUserService = async ({ senderId, receiverId, message }) => {
  return connectionService.createConnectionService({
    senderId,
    receiverId,
    category: 'DATING',
    message
  });
};

module.exports = {
  createProfileService,
  updateProfileService,
  getMyProfileService,
  getMatchesService,
  connectWithUserService
};
