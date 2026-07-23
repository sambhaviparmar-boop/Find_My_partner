
const express = require("express")
const {createJoinRequest, getUserRequest, getGroupRequest, acceptJoinRequest, cancelJoinRequest,rejectJoinRequest} = require("../../modules/joinrequest/joinrequest.controller.js")
const { authMiddleware } = require("../../core/middleware/auth.middleware.js")
const validateRequest = require("../../core/middleware/validate.middleware.js")

const { joinRequestCreateSchema,joinRequestActionSchema,cancelJoinRequestSchema, groupRequestSchema } = require("../../modules/joinrequest/joinrequest.validation.js") 

const router = express.Router();
/*  swagger docs*/
/**
 * @swagger
 * tags:
 *   name: Join Request
 *   description: Join Request APIs
 */
router.post("/create", authMiddleware, validateRequest(joinRequestCreateSchema), createJoinRequest);
/**
 * @swagger
 * /api/join-request:
 *   post:
 *     summary: Create join request
 *     tags:
 *       - Join Request
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
 *                 example: Join Request Name
 *               description:
 *                 type: string
 *                 example: Join Request Description
 *     responses:
 *       201:
 *         description: Join request created successfully
 */
router.post("/groups/:groupId/join-request", authMiddleware, validateRequest(joinRequestCreateSchema), createJoinRequest);
/**
 * @swagger
 * /api/join-request/{groupId}:
 *   post:
 *     summary: Create join request
 *     tags:
 *       - Join Request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
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
 *               name:
 *                 type: string
 *                 example: Join Request Name
 *               description:
 *                 type: string
 *                 example: Join Request Description
 *     responses:
 *       201:
 *         description: Join request created successfully
 */
router.get("/users/:userId/join-request", authMiddleware, getUserRequest);
/**
 * @swagger
 * /api/join-request/{userId}:
 *   get:
 *     summary: Get join request by user ID
 *     tags:
 *       - Join Request
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
 *         description: Join request fetched successfully
 */
router.get("/groups/:groupId/join-request", authMiddleware, validateRequest(groupRequestSchema),getGroupRequest);
/**
 * @swagger
 * /api/join-request/{groupId}:
 *   get:
 *     summary: Get join request by group ID
 *     tags:
 *       - Join Request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Join request fetched successfully
 */
router.post("/accept", authMiddleware, validateRequest(joinRequestActionSchema), acceptJoinRequest);
/**
 * @swagger
 * /api/join-request/accept:
 *   post:
 *     summary: Accept join request
 *     tags:
 *       - Join Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Join request accepted successfully
 */
router.post("/accept/:requestId/join-request", authMiddleware, validateRequest(joinRequestActionSchema), acceptJoinRequest);

/**
 * @swagger
 * /api/join-request/cancel:
 *   post:
 *     summary: Cancel join request
 *     tags:
 *       - Join Request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Join request cancelled successfully
 */
router.post("/cancel", authMiddleware, validateRequest(cancelJoinRequestSchema), cancelJoinRequest);
/**
 * @swagger
 * /api/join-request/cancel/{requestId}:
 *   post:
 *     summary: Cancel join request
 *     tags:
 *       - Join Request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Join request cancelled successfully
 */
router.post("/reject", authMiddleware, validateRequest(joinRequestActionSchema), rejectJoinRequest);
/**
 * @swagger
 * /api/join-request/reject/{requestId}:
 *   post:
 *     summary: Reject join request
 *     tags:
 *       - Join Request
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Join request rejected successfully
 */
router.patch("/reject/:requestId/join-request", authMiddleware, validateRequest(joinRequestActionSchema), rejectJoinRequest);


module.exports = router;       
