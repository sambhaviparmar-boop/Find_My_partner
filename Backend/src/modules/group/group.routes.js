
const express = require("express")
const router = express.Router();
const {authMiddleware} = require("../../core/middleware/auth.middleware");
const validate = require("../../core/middleware/validate.middleware");


const {groupCreateSchema, groupUpdateSchema, groupDeleteSchema, groupGetByIdSchema} = require("./group.validation");
const {createGroup, updateGroup, deleteGroup, getAllGroups, getGroupById} = require("./group.controller");


/   *swagger docs*/
/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Group APIs
 */


router.post("/create", validate(groupCreateSchema), authMiddleware, createGroup);
/**
 * @swagger
 * /api/group:
 *   post:
 *     summary: Create group
 *     tags:
 *       - Group
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
 *                 example: Group Name
 *               description:
 *                 type: string
 *                 example: Group Description
 *     responses:
 *       201:
 *         description: Group created successfully
 */
router.post("/update/:id", validate(groupUpdateSchema), authMiddleware, updateGroup);
/**
 * @swagger
 * /api/group/{id}:
 *   post:
 *     summary: Update group
 *     tags:
 *       - Group
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
 *               name:
 *                 type: string
 *                 example: Group Name
 *               description:
 *                 type: string
 *                 example: Group Description
 *     responses:
 *       200:
 *         description: Group updated successfully
 */
router.post("/delete/:id", validate(groupDeleteSchema), authMiddleware, deleteGroup);
/**
 * @swagger
 * /api/group/{id}:
 *   post:
 *     summary: Delete group
 *     tags:
 *       - Group
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
 *         description: Group deleted successfully
 */
router.get("/", authMiddleware, getAllGroups);
router.get("/:id", validate(groupGetByIdSchema), authMiddleware, getGroupById);


module.exports = router;    