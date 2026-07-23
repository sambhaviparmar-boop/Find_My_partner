const express = require("express");
const router = express.Router();
const {
    createNotificationController,
    getAllNotificationsController,
    updateNotificationController,
    deleteNotificationController
} = require("./notification.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification APIs
 */

router.post("/", authMiddleware, createNotificationController);
/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Create notification
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: Hello
 *     responses:
 *       201:
 *         description: Notification created successfully
 */
router.get("/", authMiddleware, getAllNotificationsController);
/**
 * @swagger
 * /api/notification:
 *   get:
 *     summary: Get all notifications
 *     tags:
 *       - Notification
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications fetched successfully
 */
router.put("/:id", authMiddleware, updateNotificationController);
/**
 * @swagger
 * /api/notification/{id}:
 *   put:
 *     summary: Update notification
 *     tags:
 *       - Notification
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
 *               content:
 *                 type: string
 *                 example: Hello
 *     responses:
 *       200:
 *         description: Notification updated successfully
 */
router.delete("/:id", authMiddleware, deleteNotificationController);
/**
 * @swagger
 * /api/notification/{id}:
 *   delete:
 *     summary: Delete notification
 *     tags:
 *       - Notification
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
 *         description: Notification deleted successfully
 */

module.exports = router;