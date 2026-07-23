const hackathonController = require("./hackathon.controller.js");
const validation = require("./hackathon.validation.js");
const {validate}= require("../../core/middleware/validation.js")
const {authMiddleware} = require("../../core/middleware/auth.middleware");
const {upload} = require("../../core/middleware/multer.middleware.js");

const express = require("express");
const router = express.Router();

/*swagger docs*/
/**
 * @swagger
 * tags:
 *   name: Hackathon
 *   description: Hackathon APIs
 */
router.post("/",upload.single("image"),authMiddleware,validate(validation.createHackathonValidation),hackathonController.createHackathonController);
/**
 * @swagger
 * /api/hackathon:
 *   post:
 *     summary: Create hackathon
 *     tags:
 *       - Hackathon
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
 *                 example: Hackathon Name
 *               description:
 *                 type: string
 *                 example: Hackathon Description
 *     responses:
 *       201:
 *         description: Hackathon created successfully
 */
router.get("/",validate(validation.getAllHackathonsValidation),hackathonController.getAllHackathonsController);
/**
 * @swagger
 * /api/hackathon:
 *   get:
 *     summary: Get all hackathons
 *     tags:
 *       - Hackathon
 *     responses:
 *       200:
 *         description: Hackathons fetched successfully
 */
router.get("/:id",validate(validation.getHackathonByIdValidation),hackathonController.getHackathonByIdController);
/**
 * @swagger
 * /api/hackathon/{id}:
 *   get:
 *     summary: Get hackathon by ID
 *     tags:
 *       - Hackathon
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Hackathon fetched successfully
 */
router.put("/:id",upload.single("image"),authMiddleware,validate(validation.updateHackathonValidation),hackathonController.updateHackathonController);
/**
 * @swagger
 * /api/hackathon/{id}:
 *   put:
 *     summary: Update hackathon
 *     tags:
 *       - Hackathon
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
 *                 example: Hackathon Name
 *               description:
 *                 type: string
 *                 example: Hackathon Description
 *     responses:
 *       200:
 *         description: Hackathon updated successfully
 */
router.delete("/:id",authMiddleware,validate(validation.deleteHackathonValidation),hackathonController.deleteHackathonController);  

module.exports = router;
