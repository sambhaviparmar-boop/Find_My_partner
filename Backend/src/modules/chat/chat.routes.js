const express = require("express");
const router = express.Router();
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const chatValidation = require("./chat.validation");
const chatController = require("./chat.controller");


/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat APIs
 */
router.get("/online-users", authMiddleware, chatController.getOnlineUsersController);
/**
 * @swagger
 * /api/chat/online-users:
 *   get:
 *     summary: Get online users
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Online users fetched successfully
 */
router.get("/", authMiddleware, chatController.getChatByParticipantIdsController);
/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Get chats by participant IDs
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chats fetched successfully
 */
router.get("/:id", authMiddleware, chatController.getChatByIdController);
/**
 * @swagger
 * /api/chat/{id}:
 *   get:
 *     summary: Get chat by ID
 *     tags:
 *       - Chat
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
 *         description: Chat fetched successfully
 */
router.post("/", authMiddleware, validate(chatValidation.createChatSchema), chatController.createChatController);
/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Create chat
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Chat created successfully
 */
router.put("/:id", authMiddleware, validate(chatValidation.updateChatSchema), chatController.updateChatController);
/**
 * @swagger
 * /api/chat/{id}:
 *   put:
 *     summary: Update chat
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Chat updated successfully
 */
router.delete("/:id", authMiddleware, chatController.deleteChatController);

module.exports = router;