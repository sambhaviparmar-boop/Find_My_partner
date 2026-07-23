const blockController = require("./block.controller")
const authMiddleware = require("../../core/middleware/auth.middleware")
const blockValidation = require("./block.validation")
const validate = require("../../core/middleware/validate.middleware")
const express = require("express")
const router = express.Router()



/**
 * @swagger
 * tags:
 *   name: Block
 *   description: Block APIs
 */
/**
 * @swagger
 * /api/block:
 *   post:
 *     summary: Block a user
 *     tags:
 *       - Block
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockedUserId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: User blocked successfully
 */             
router.post("/",authMiddleware,validate(blockValidation.blockUserSchema),blockController.blockUserController)
/**
 * @swagger
 * /api/block/{id}:
 *   delete:
 *     summary: Unblock a user
 *     tags:
 *       - Block
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
 *         description: User unblocked successfully
 */
router.delete("/:id",authMiddleware,validate(blockValidation.blockUserSchema)   ,blockController.deleteBlockController)
/**
 * @swagger
 * /api/block:
 *   get:
 *     summary: Get all blocked users
 *     tags:
 *       - Block
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocked users fetched successfully
 */
router.get("/",authMiddleware,blockController.getAllBlocksController)




module.exports = router