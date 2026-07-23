const express = require("express");
const router = express.Router();
const messageController = require("./message.controller");
const validate = require("../../core/middleware/validate.middleware.js");
const { authMiddleware } = require("../../core/middleware/auth.middleware.js");
const messageValidation = require("./message.validation");


/* swagger docs*/
/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Message APIs
 */ 
router.get("/unread-count", authMiddleware, messageController.getUnreadCountController);
/**
 * @swagger
 * /api/message/unread-count:
 *   get:
 *     summary: Get unread count
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count fetched successfully
 */
router.post("/", authMiddleware, validate(messageValidation.createMessageValidation), messageController.createMessageController);
/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Create message
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: number
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: Hello
 *     responses:
 *       201:
 *         description: Message created successfully
 */
router.get("/:chatId", authMiddleware, messageController.getAllMessagesController);
/**
 * @swagger
 * /api/message/{chatId}:
 *   get:
 *     summary: Get all messages
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: chatId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: All messages fetched successfully
 */
router.delete("/:messageId", authMiddleware, validate(messageValidation.deleteMessageValidation), messageController.deleteMessageController);
/**
 * @swagger
 * /api/message/{messageId}:
 *   delete:
 *     summary: Delete message
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: messageId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
router.put("/:messageId", authMiddleware, validate(messageValidation.updateMessageValidation), messageController.updateMessageController);
/**
 * @swagger
 * /api/message/{messageId}:
 *   put:
 *     summary: Update message
 *     tags:
 *       - Message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: messageId
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
 *               content:
 *                 type: string
 *                 example: Hello
 *     responses:
 *       200:
 *         description: Message updated successfully
 */

module.exports = router;