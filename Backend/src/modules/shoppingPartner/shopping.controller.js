const asyncHandler = require('../../core/utils/asyncHandler');
const ApiResponse = require('../../core/utils/apiResponce');
const shoppingService = require('./shopping.service');

const createPreference = asyncHandler(async (req, res) => {
  const preference = await shoppingService.createPreferenceService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(201).json(new ApiResponse(201, preference, 'Shopping preference created successfully'));
});

const updatePreference = asyncHandler(async (req, res) => {
  const preference = await shoppingService.updatePreferenceService({
    userId: req.user.id,
    ...req.body
  });

  return res.status(200).json(new ApiResponse(200, preference, 'Shopping preference updated successfully'));
});

const getPreference = asyncHandler(async (req, res) => {
  const preference = await shoppingService.getPreferenceService(req.user.id);
  return res.status(200).json(new ApiResponse(200, preference, 'Shopping preference fetched successfully'));
});

const getMatches = asyncHandler(async (req, res) => {
  const matches = await shoppingService.getMatchesService(req.user.id, req.query);
  return res.status(200).json(new ApiResponse(200, matches, 'Shopping matches fetched successfully'));
});

const connectWithPartner = asyncHandler(async (req, res) => {
  const connection = await shoppingService.connectWithPartnerService({
    senderId: req.user.id,
    receiverId: Number(req.params.userId),
    message: req.body.message
  });

  return res.status(201).json(new ApiResponse(201, connection, 'Shopping partner connection request sent'));
});

const chatWithPartner = asyncHandler(async (req, res) => {
  const chat = await shoppingService.chatWithPartnerService({
    senderId: req.user.id,
    receiverId: Number(req.params.userId)
  });

  return res.status(201).json(new ApiResponse(201, chat, 'Shopping chat started successfully'));
});

module.exports = {
  createPreference,
  updatePreference,
  getPreference,
  getMatches,
  connectWithPartner,
  chatWithPartner
};
