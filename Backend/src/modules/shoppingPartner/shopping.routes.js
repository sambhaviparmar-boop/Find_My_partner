const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const controller = require('./shopping.controller');
const validation = require('./shopping.validation');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Shopping Partner
 *   description: Shopping Partner APIs
 */
router.post('/preference', validate(validation.createPreferenceSchema), controller.createPreference);
/**
 * @swagger
 * /api/shopping-partner/preference:
 *   post:
 *     summary: Create shopping partner preference
 *     tags: [Shopping Partner]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateShoppingPreferenceInput"
 *     responses:
 *       201:
 *         description: Shopping partner preference created successfully
 *       400:
 *         description: Invalid input
 */
router.patch('/preference', validate(validation.updatePreferenceSchema), controller.updatePreference);
/**
 * @swagger
 * /api/shopping-partner/preference:
 *   patch:
 *     summary: Update shopping partner preference
 *     tags: [Shopping Partner]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateShoppingPreferenceInput"
 *     responses:
 *       200:
 *         description: Shopping partner preference updated successfully
 */
router.get('/preference', controller.getPreference);
/**
 * @swagger
 * /api/shopping-partner/preference:
 *   get:
 *     summary: Get shopping partner preference
 *     tags: [Shopping Partner]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         description: Shopping partner preference fetched successfully
 */
router.get('/matches', validate(validation.matchesSchema), controller.getMatches);
/**
 * @swagger
 * /api/shopping-partner/matches:
 *   get:
 *     summary: Get matches for shopping partner
 *     tags: [Shopping Partner]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Matches fetched successfully
 */
router.post('/connect/:userId', validate(validation.connectSchema), controller.connectWithPartner);
/**
 * @swagger
 * /api/shopping-partner/connect/{userId}:
 *   post:
 *     summary: Connect with shopping partner
 *     tags: [Shopping Partner]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Connected with shopping partner successfully
 */
router.post('/chat/:userId', validate(validation.connectSchema), controller.chatWithPartner);

module.exports = router;
