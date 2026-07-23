const express = require("express");
const router = express.Router();
const realiabilityController = require("./realiability.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const {
    createReliabilitySchema,
    getReliabilitySchema,
    updateReliabilitySchema,
    deleteReliabilitySchema
} = require("./realiability.validation");

/**
 * @swagger
 * tags:
 *   name: Reliability
 *   description: Reliability APIs
 */

router.post("/", authMiddleware, validate(createReliabilitySchema), realiabilityController.createReliabilityController);
/**
 * @swagger
 * /api/reliability:
 *   post:
 *     summary: Create reliability
 *     tags:
 *       - Reliability
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category: 
 *                 type: string
 *                 example: Technology
 *               totalConnections: 
 *                 type: number
 *                 example: 10
 *               successfulConnections: 
 *                 type: number
 *                 example: 5
 *               completedCollaborations: 
 *                 type: number
 *                 example: 2
 *               responseRate: 
 *                 type: number
 *                 example: 80
 *               reviewsCount: 
 *                 type: number
 *                 example: 3
 *     responses:
 *       201:
 *         description: Reliability created successfully
 */
router.get("/:userId", authMiddleware, validate(getReliabilitySchema), realiabilityController.getReliabilityController);
/**
 * @swagger
 * /api/reliability/{userId}:
 *   get:
 *     summary: Get reliability by user ID
 *     tags:
 *       - Reliability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Reliability fetched successfully
 */
router.put("/:userId", authMiddleware, validate(updateReliabilitySchema), realiabilityController.updateReliabilityController);
/**
 * @swagger
 * /api/reliability/{userId}:
 *   put:
 *     summary: Update reliability
 *     tags:
 *       - Reliability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category: 
 *                 type: string
 *                 example: Technology
 *               totalConnections: 
 *                 type: number
 *                 example: 10
 *               successfulConnections: 
 *                 type: number
 *                 example: 5
 *               completedCollaborations: 
 *                 type: number
 *                 example: 2
 *               responseRate: 
 *                 type: number
 *                 example: 80
 *               reviewsCount: 
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Reliability updated successfully
 */
router.delete("/:userId", authMiddleware, validate(deleteReliabilitySchema), realiabilityController.deleteReliabilityController);

module.exports = router;