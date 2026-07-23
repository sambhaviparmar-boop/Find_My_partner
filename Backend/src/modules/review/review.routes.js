const express = require("express");
const router = express.Router();
const {
    createReviewController,
    getUserReviewsController,
    getUserGivenReviewsController,
    deleteReviewController,
    updateReviewController
} = require("./review.controller");
const {
    createReviewSchema,
    updateReviewSchema,
    deleteReviewSchema,
    getUserReviewsSchema,
    getUserGivenReviewsSchema
} = require("./review.validation");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review APIs
 */

router.post("/create", authMiddleware, validate(createReviewSchema), createReviewController);
/**
 * @swagger
 * /api/review/create:
 *   post:
 *     summary: Create review
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewerId: 
 *                 type: number
 *                 example: 1
 *               revieweeId: 
 *                 type: number
 *                 example: 2
 *               rating: 
 *                 type: number
 *                 example: 5
 *               comment: 
 *                 type: string
 *                 example: Great collaboration!
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.get("/user/:userId", authMiddleware, validate(getUserReviewsSchema), getUserReviewsController);
/**
 * @swagger
 * /api/review/user/{userId}:
 *   get:
 *     summary: Get reviews by user ID
 *     tags:
 *       - Review
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
 *         description: Reviews fetched successfully
 */
router.get("/given/:userId", authMiddleware, validate(getUserGivenReviewsSchema), getUserGivenReviewsController);
/**
 * @swagger
 * /api/review/given/{userId}:
 *   get:
 *     summary: Get given reviews by user ID
 *     tags:
 *       - Review
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
 *         description: Given reviews fetched successfully
 */
router.delete("/delete/:id", authMiddleware, validate(deleteReviewSchema), deleteReviewController);
/**
 * @swagger
 * /api/review/delete/{id}:
 *   delete:
 *     summary: Delete review
 *     tags:
 *       - Review
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
 *         description: Review deleted successfully
 */
router.put("/update/:id", authMiddleware, validate(updateReviewSchema), updateReviewController);

module.exports = router;
