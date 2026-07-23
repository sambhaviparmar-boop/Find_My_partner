const express = require('express');
const {
    createProfile,
    updateProfile,
    deleteProfile,
    getProfileByUserId,
    getProfile
} = require('./profile.controller');
const {authMiddleware} = require('../../core/middleware/auth.middleware');
const {createProfileSchema, updateProfileSchema} = require('./profile.validation');
const validate = require('../../core/middleware/validate.middleware');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile APIs
 */

router.post('/create', authMiddleware, validate(createProfileSchema), createProfile);
/**
 * @swagger
 * /api/profile/create:
 *   post:
 *     summary: Create profile
 *     tags:
 *       - Profile
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
 *               bio: 
 *                 type: string
 *                 example: Hello
 *               avatar: 
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *               city: 
 *                 type: string
 *                 example: New York
 *               college: 
 *                 type: string
 *                 example: Harvard University
 *               branch: 
 *                 type: string
 *                 example: Computer Science
 *               year: 
 *                 type: number
 *                 example: 2022
 *               github: 
 *                 type: string
 *                 example: https://github.com/johndoe
 *               linkedin: 
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               portfolio: 
 *                 type: string
 *                 example: https://johndoe.com
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.get('/me', authMiddleware, getProfileByUserId);
/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Get profile by user ID
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.put('/update', authMiddleware, validate(updateProfileSchema), updateProfile);
/**
 * @swagger
 * /api/profile/update:
 *   put:
 *     summary: Update profile
 *     tags:
 *       - Profile
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
 *               bio: 
 *                 type: string
 *                 example: Hello
 *               avatar: 
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *               city: 
 *                 type: string
 *                 example: New York
 *               college: 
 *                 type: string
 *                 example: Harvard University
 *               branch: 
 *                 type: string
 *                 example: Computer Science
 *               year: 
 *                 type: number
 *                 example: 2022
 *               github: 
 *                 type: string
 *                 example: https://github.com/johndoe
 *               linkedin: 
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               portfolio: 
 *                 type: string
 *                 example: https://johndoe.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.get('/:id', authMiddleware, getProfile);
/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     summary: Get profile by ID
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.delete('/:id', authMiddleware, deleteProfile);

module.exports = router;
