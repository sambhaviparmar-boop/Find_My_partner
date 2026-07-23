const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const {
    createReportSchema,
    getReportByIdSchema,
    updateReportStatusSchema,
    deleteReportStatusSchema
} = require("./report.validation");

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Report APIs
 */

router.post("/", authMiddleware, validate(createReportSchema), reportController.createReportController);
/**
 * @swagger
 * /api/report:
 *   post:
 *     summary: Create report
 *     tags:
 *       - Report
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportedBy: 
 *                 type: string
 *                 example: John Doe
 *               reportedTo: 
 *                 type: string
 *                 example: Jane Doe
 *               reason: 
 *                 type: string
 *                 example: Harassment
 *               description: 
 *                 type: string
 *                 example: He was harassing me
 *     responses:
 *       201:
 *         description: Report created successfully
 */
router.get("/status/:status", authMiddleware, reportController.getReportsByStatusController);
/**
 * @swagger
 * /api/report/status/{status}:
 *   get:
 *     summary: Get reports by status
 *     tags:
 *       - Report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: pending
 *     responses:
 *       200:
 *         description: Reports fetched successfully
 */
router.get("/:id", authMiddleware, validate(getReportByIdSchema), reportController.getReportByIdController);
/**
 * @swagger
 * /api/report/{id}:
 *   get:
 *     summary: Get report by ID
 *     tags:
 *       - Report
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
 *         description: Report fetched successfully
 */
router.get("/", authMiddleware, reportController.getAllReportsController);
/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: Get all reports
 *     tags:
 *       - Report
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reports fetched successfully
 */
router.put("/:id", authMiddleware, validate(updateReportStatusSchema), reportController.updateReportStatusController);
/**
 * @swagger
 * /api/report/{id}:
 *   put:
 *     summary: Update report status
 *     tags:
 *       - Report
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
 *               status: 
 *                 type: string
 *                 example: resolved
 *     responses:
 *       200:
 *         description: Report status updated successfully
 */
router.delete("/:id", authMiddleware, validate(deleteReportStatusSchema), reportController.deleteReportController);

module.exports = router;
