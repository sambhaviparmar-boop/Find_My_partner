const networkingRepository = require('./networking.repository');
const connectionService = require('../connection/connection.service');
const ApiError = require('../../core/utils/apiError');

const createProfileService = async ({ userId, industry, currentRole, experience, goals, availability, location }) => {
  const existing = await networkingRepository.getByUserId(userId);
  if (existing) {
    throw new ApiError(409, 'Networking profile already exists');
  }

  return networkingRepository.createProfile({
    userId: Number(userId),
    industry,
    currentRole,
    experience: Number(experience),
    goals,
    availability,
    location
  });
};

const updateProfileService = async ({ userId, industry, currentRole, experience, goals, availability, location }) => {
  const existing = await networkingRepository.getByUserId(userId);
  if (!existing) {
    throw new ApiError(404, 'Networking profile not found');
  }

  return networkingRepository.updateProfile(userId, {
    industry,
    currentRole,
    experience: experience !== undefined ? Number(experience) : undefined,
    goals,
    availability,
    location
  });
};

const getMyProfileService = async (userId) => {
  const profile = await networkingRepository.getByUserId(userId);
  if (!profile) {
    throw new ApiError(404, 'Networking profile not found');
  }
  return profile;
};

const discoverProfessionalsService = async (userId, filters = {}) => {
  const profiles = await networkingRepository.findManyProfiles({
    ...filters,
    skills: filters.skills ? filters.skills.split(',').map((item) => item.trim()).filter(Boolean) : []
  });

  return profiles.filter((profile) => profile.user.id !== Number(userId));
};

const connectWithUserService = async ({ senderId, receiverId, message, category = 'NETWORKING' }) => {
  return connectionService.createConnectionService({
    senderId,
    receiverId,
    category,
    message
  });
};

module.exports = {
  createProfileService,
  updateProfileService,
  getMyProfileService,
  discoverProfessionalsService,
  connectWithUserService
};
