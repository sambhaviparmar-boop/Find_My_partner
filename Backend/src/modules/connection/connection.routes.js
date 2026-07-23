const connectionController = require("./connection.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const connectionValidation = require("./connection.validation");
const validate = require("../../core/middleware/validate.middleware")
const express = require("express")
const router = express.Router();

router.use(authMiddleware)


/**
 * @swagger
 * tags:
 *   name: Connection
 *   description: Connection APIs
 */ 
router.post("/",validate(connectionValidation.createConnectionValidation),connectionController.createConnectionController);
/**
 * @swagger
 * /api/connection:
 *   post:
 *     summary: Create connection
 *     tags:
 *       - Connection
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: Connection
 *               senderId:
 *                 type: number
 *                 example: 1
 *               receiverId:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Connection created successfully
 */
router.get("/:id",connectionController.getConnectionController);
/**
 * @swagger
 * /api/connection/{id}:
 *   get:
 *     summary: Get connection by ID
 *     tags:
 *       - Connection
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
 *         description: Connection fetched successfully
 */
router.get("/",connectionController.getAllConnectionsController);
/**
 * @swagger
 * /api/connection:
 *   get:
 *     summary: Get all connections
 *     tags:
 *       - Connection
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Connections fetched successfully
 */
router.put("/:id",connectionController.updateConnectionController);
/**
 * @swagger
 * /api/connection/{id}:
 *   put:
 *     summary: Update connection
 *     tags:
 *       - Connection
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
 *               type:
 *                 type: string
 *                 example: Connection
 *     responses:
 *       200:
 *         description: Connection updated successfully
 */
router.delete("/:id",connectionController.deleteConnectionController);
/**
 * @swagger
 * /api/connection/{id}:
 *   delete:
 *     summary: Delete connection
 *     tags:
 *       - Connection
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
 *         description: Connection deleted successfully
 */

module.exports = router;