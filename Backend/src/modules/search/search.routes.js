const express = require("express");
const router = express.Router();
const controller = require("./search.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const {
    createSearchHistoryValidation,
    getMySearchHistoryValidation,
    getAllSearchHistoryValidation
} = require("./search.validation");


/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search APIs
 */

router.post("/create", authMiddleware, validate(createSearchHistoryValidation), controller.createSearchHistoryController);
/**
 * @swagger
 * /api/search/create:
 *   post:
 *     summary: Create search history
 *     tags: [Search]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateSearchHistoryInput"
 *     responses:
 *       201:
 *         description: Search history created successfully
 *       400:
 *         description: Invalid input
 */

router.get("/get/:userId", authMiddleware, validate(getMySearchHistoryValidation), controller.getMySearchHistoryController);
/**
 * @swagger
 * /api/search/get/{userId}:
 *   get:
 *     summary: Get my search history
 *     tags: [Search]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Search history fetched successfully
 */

router.get("/getAll", authMiddleware, validate(getAllSearchHistoryValidation), controller.getAllSearchHistoryController);
/**
 * @swagger
 * /api/search/getAll:
 *   get:
 *     summary: Get all search history
 *     tags: [Search]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         description: All search history fetched successfully
 */

module.exports = router;
