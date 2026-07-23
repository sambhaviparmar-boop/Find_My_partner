const express = require("express");
const {
    getRecommendationsController,
    getMatchDetailsController,
    acceptMatchController,
    rejectMatchController,
    getConnectionsController
} = require("./matching.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const validate = require("../../core/middleware/validate.middleware");
const {
    getRecommendationsSchema,
    getRecommendationByIdSchema,
    acceptMatchSchema,
    rejectMatchSchema,
    getConnectionsSchema
} = require("./matching.validation");

const router = express.Router();

router.use(authMiddleware);
/* swagger docs */
    /**
 * @swagger
 * tags:
 *   name: Matching
 *   description: Matching APIs
 */ 
router.get("/recommendations", validate(getRecommendationsSchema), getRecommendationsController);
/**
 * @swagger
 * /api/matching/recommendations:
 *   get:
 *     summary: Get recommendations
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recommendations fetched successfully
 */
router.get("/recommendations/:userId", validate(getRecommendationByIdSchema), getMatchDetailsController);
/**
 * @swagger
 * /api/matching/recommendations/{userId}:
 *   get:
 *     summary: Get match details
 *     tags:
 *       - Matching
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
 *         description: Match details fetched successfully
 */
router.post("/accept/:matchId", validate(acceptMatchSchema), acceptMatchController);
/**
 * @swagger
 * /api/matching/accept/{matchId}:
 *   post:
 *     summary: Accept match
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Match accepted successfully
 */
router.post("/reject/:matchId", validate(rejectMatchSchema), rejectMatchController);
/**
 * @swagger
 * /api/matching/reject/{matchId}:
 *   post:
 *     summary: Reject match
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Match rejected successfully
 */
router.get("/connections/:userId", validate(getConnectionsSchema), getConnectionsController);

module.exports = router;
