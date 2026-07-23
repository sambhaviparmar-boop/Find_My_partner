const express = require('express');
const router = express.Router();
const asyncHandler = require('../../core/utils/asyncHandler');
const { authMiddleware } = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const controller = require('./networking.controller');
const validation = require('./networking.validation');

router.use(authMiddleware);
/**
 * @swagger
 * tags:
 *   name: Networking
 *   description: Networking APIs
 */ 
router.post('/profile', validate(validation.createProfileSchema), controller.createProfile);
/**
 * @swagger
 * /api/networking/profile:
 *   post:
 *     summary: Create profile
 *     tags:
 *       - Networking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: [EMAIL_ADDRESS]
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               bio:
 *                 type: string
 *                 example: I am a software engineer
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "React", "Node.js"]
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.patch('/profile', validate(validation.updateProfileSchema), controller.updateProfile);
/**
 * @swagger
 * /api/networking/profile:
 *   patch:
 *     summary: Update profile
 *     tags:
 *       - Networking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: [EMAIL_ADDRESS]
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               bio:
 *                 type: string
 *                 example: I am a software engineer
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "React", "Node.js"]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.get('/profile', controller.getMyProfile);
/**
 * @swagger
 * /api/networking/profile:
 *   get:
 *     summary: Get my profile
 *     tags:
 *       - Networking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My profile fetched successfully
 */
router.get('/discover', validate(validation.discoverSchema), controller.discoverProfessionals);
/**
 * @swagger
 * /api/networking/discover:
 *   get:
 *     summary: Discover professionals
 *     tags:
 *       - Networking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: skills
 *         in: query
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "React", "Node.js"]
 *       - name: location
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "New York"
 *       - name: experienceLevel
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "Mid-level"
 *       - name: industry
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "Technology"
 *     responses:
 *       200:
 *         description: Professionals discovered successfully
 */
router.post('/connect/:userId', validate(validation.connectSchema), controller.connectWithUser);

module.exports = router;
