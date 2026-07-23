const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const controller = require('./dating.controller');
const validation = require('./dating.validation');

router.use(authMiddleware);

/*swagger  docs*/
/**
 * @swagger
 * tags:
 *   name: Dating
 *   description: Dating APIs
 */
router.post('/profile', validate(validation.createProfileSchema), controller.createProfile);
/**
 * @swagger
 * /api/dating/profile:
 *   post:
 *     summary: Create profile
 *     tags:
 *       - Dating
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               bio:
 *                 type: string
 *                 example: Bio
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Reading", "Traveling"]
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.patch('/profile', validate(validation.updateProfileSchema), controller.updateProfile);
/**
 * @swagger
 * /api/dating/profile:
 *   patch:
 *     summary: Update profile
 *     tags:
 *       - Dating
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Bio
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Reading", "Traveling"]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.get('/profile', controller.getMyProfile);
/**
 * @swagger
 * /api/dating/profile:
 *   get:
 *     summary: Get my profile
 *     tags:
 *       - Dating
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get('/matches', validate(validation.matchesSchema), controller.getMatches);
/**
 * @swagger
 * /api/dating/matches:
 *   get:
 *     summary: Get matches
 *     tags:
 *       - Dating
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Matches fetched successfully
 */
router.post('/connect/:userId', validate(validation.connectSchema), controller.connectWithUser);
/**
 * @swagger
 * /api/dating/connect/{userId}:
 *   post:
 *     summary: Connect with user
 *     tags:
 *       - Dating
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 2
 *     responses:
 *       200:
 *         description: Connection request sent successfully
 */

module.exports = router;
