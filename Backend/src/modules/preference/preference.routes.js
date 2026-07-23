const express = require("express");
const router = express.Router();
const {createPreference,getPreference,updatePreference,deletePreference,getPreferenceByUserId} = require("./preference.controller");
const {authMiddleware} = require("../middleware/authMiddleware");
const {validate} = require("../middleware/validate");
const {createPreferenceValidation,updatePreferenceValidation} = require("../preference/preference.validation");
/**
 * @swagger
 * tags:
 *   name: Preference
 *   description: Preference APIs
     */
/**
 * @swagger
 * /api/preference:
 *   post:
 *     summary: Create preference
 *     tags:
 *       - Preference
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill: 
 *                 type: string
 *                 example: JavaScript
 *               experienceLevel:
 *                 type: string
 *                 example: Mid-level
 *               industry:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       201:
 *         description: Preference created successfully
 */
router.post("/",authMiddleware,validate(createPreferenceValidation),createPreference);
/**
 * @swagger
 * /api/preference:
 *   get:
 *     summary: Get preference
 *     tags:
 *       - Preference
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preference fetched successfully
 */
router.get("/",authMiddleware,getPreference);
/**
 * @swagger
 * /api/preference:
 *   put:
 *     summary: Update preference
 *     tags:
 *       - Preference
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill: 
 *                 type: string
 *                 example: JavaScript
 *               experienceLevel:
 *                 type: string
 *                 example: Mid-level
 *               industry:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       200:
 *         description: Preference updated successfully
 */
router.put("/",authMiddleware,validate(updatePreferenceValidation),updatePreference);
/**
 * @swagger
 * /api/preference:
 *   delete:
 *     summary: Delete preference
 *     tags:
 *       - Preference
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preference deleted successfully
 */
router.delete("/",authMiddleware,deletePreference);
/**
 * @swagger
 * /api/preference/{userId}:
 *   get:
 *     summary: Get preference by user ID
 *     tags:
 *       - Preference
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
 *         description: Preference fetched successfully
 */
router.get("/:userId",authMiddleware,getPreferenceByUserId);


module.exports = router;    
