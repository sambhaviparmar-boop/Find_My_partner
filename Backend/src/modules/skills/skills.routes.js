const express = require("express");
const router = express.Router();
const {
    createSkillController,
    getAllSkillsController,
    getSkillByIdController,
    updateSkillController,
    deleteSkillController,
    createUserskillController,
    getAllUserskillController,
    getUserskillByIdController,
    updateUserskillController,
    deleteUserskillController
} = require("./skills.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const validate = require("../../core/middleware/validate.middleware");
const {
    createSkillSchema,
    updateSkillSchema,
    getSkillByIdSchema,
    deleteSkillSchema,
    createUserSkillSchema,
    updateUserSkillSchema,
    getUserSkillByIdSchema,
    deleteUserSkillSchema
} = require("./skills.validation");

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skills APIs
 */

// Base Skill routes
router.post("/", authMiddleware, validate(createSkillSchema), createSkillController);
/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateSkillInput"
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Invalid input
 */
router.get("/", getAllSkillsController);
/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Skills fetched successfully
 */
router.get("/:id", validate(getSkillByIdSchema), getSkillByIdController);
/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Skill fetched successfully
 */
router.put("/:id", authMiddleware, validate(updateSkillSchema), updateSkillController);
/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateSkillInput"
 *     responses:
 *       200:
 *         description: Skill updated successfully
 */
router.delete("/:id", authMiddleware, validate(deleteSkillSchema), deleteSkillController);


// User Skill routes
router.post("/user", authMiddleware, validate(createUserSkillSchema), createUserskillController);
/**
 * @swagger
 * /api/skills/user:
 *   post:
 *     summary: Create a new user skill
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUserSkillInput"
 *     responses:
 *       201:
 *         description: User skill created successfully
 *       400:
 *         description: Invalid input
 */
router.get("/user/all", authMiddleware, getAllUserskillController);
/**
 * @swagger
 * /api/skills/user/all:
 *   get:
 *     summary: Get all user skills
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         description: All user skills fetched successfully
 */
router.get("/user/:id", authMiddleware, validate(getUserSkillByIdSchema), getUserskillByIdController);
/**
 * @swagger
 * /api/skills/user/{id}:
 *   get:
 *     summary: Get user skill by ID
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User skill fetched successfully
 */
router.put("/user/:id", authMiddleware, validate(updateUserSkillSchema), updateUserskillController);
/**
 * @swagger
 * /api/skills/user/{id}:
 *   put:
 *     summary: Update a user skill
 *     tags: [Skills]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserSkillInput"
 *     responses:
 *       200:
 *         description: User skill updated successfully
 */
router.delete("/user/:id", authMiddleware, validate(deleteUserSkillSchema), deleteUserskillController);

module.exports = router;
