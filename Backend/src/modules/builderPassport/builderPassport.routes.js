const express = require("express");
const {
    createPassportController,
    getMyPassportController,
    getPassportByUserIdController,
    updatePassportController,
    deletePassportController
} = require("./builderPassport.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const validate = require("../../core/middleware/validate.middleware");
const {
    createBuilderPassportValidation,
    updateBuilderPassportValidation
} = require("./builderPassport.validation");

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Builder Passport
 *   description: Builder Passport APIs
 */             
router.post("/", authMiddleware, validate(createBuilderPassportValidation), createPassportController);
/**
 * @swagger
 * /api/builder-passport:
 *   post:
 *     summary: Create builder passport
 *     tags:
 *       - Builder Passport
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
 *                 example: Builder Passport
 *     responses:
 *       201:
 *         description: Builder passport created successfully
 */
router.get("/", authMiddleware, getMyPassportController);
/**
 * @swagger
 * /api/builder-passport:
 *   get:
 *     summary: Get my builder passport
 *     tags:
 *       - Builder Passport
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My builder passport fetched successfully
 */
router.put("/", authMiddleware, validate(updateBuilderPassportValidation), updatePassportController);
/**
 * @swagger
 * /api/builder-passport:
 *   put:
 *     summary: Update builder passport
 *     tags:
 *       - Builder Passport
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
 *                 example: Builder Passport
 *     responses:
 *       200:
 *         description: Builder passport updated successfully
 */
router.delete("/", authMiddleware, deletePassportController);
/**
 * @swagger
 * /api/builder-passport:
 *   delete:
 *     summary: Delete builder passport
 *     tags:
 *       - Builder Passport
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Builder passport deleted successfully
 */
router.get("/:userId", authMiddleware, getPassportByUserIdController);
/**
 * @swagger
 * /api/builder-passport/{userId}:
 *   get:
 *     summary: Get builder passport by user ID
 *     tags:
 *       - Builder Passport
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
 *         description: Builder passport fetched successfully
 */

module.exports = router;