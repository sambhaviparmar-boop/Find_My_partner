const shoppingRepository = require('./shopping.repository');
const connectionService = require('../connection/connection.service');
const ApiError = require('../../core/utils/apiError');

const createPreferenceService = async ({ userId, categories, budgetRange, shoppingType, preferredLocation }) => {
  const existing = await shoppingRepository.getByUserId(userId);
  if (existing) {
    throw new ApiError(409, 'Shopping preference already exists');
  }

  return shoppingRepository.createPreference({
    userId: Number(userId),
    categories,
    budgetRange,
    shoppingType,
    preferredLocation
  });
};

const updatePreferenceService = async ({ userId, categories, budgetRange, shoppingType, preferredLocation }) => {
  const existing = await shoppingRepository.getByUserId(userId);
  if (!existing) {
    throw new ApiError(404, 'Shopping preference not found');
  }

  return shoppingRepository.updatePreference(userId, {
    categories,
    budgetRange,
    shoppingType,
    preferredLocation
  });
};

const getPreferenceService = async (userId) => {
  const preference = await shoppingRepository.getByUserId(userId);
  if (!preference) {
    throw new ApiError(404, 'Shopping preference not found');
  }
  return preference;
};

const getMatchesService = async (userId, filters = {}) => {
  return shoppingRepository.findMatches(userId, filters);
};

const connectWithPartnerService = async ({ senderId, receiverId, message }) => {
  return connectionService.createConnectionService({
    senderId,
    receiverId,
    category: 'SHOPPING',
    message
  });
};

const chatWithPartnerService = async ({ senderId, receiverId }) => {
  return {
    senderId: Number(senderId),
    receiverId: Number(receiverId),
    message: 'Shopping chat session initialized'
  };
};

module.exports = {
  createPreferenceService,
  updatePreferenceService,
  getPreferenceService,
  getMatchesService,
  connectWithPartnerService,
  chatWithPartnerService
};
