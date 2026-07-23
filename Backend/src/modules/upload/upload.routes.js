const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../core/middleware/auth.middleware');
const validate = require('../../core/middleware/validate.middleware');
const controller = require('./upload.controller');
const validation = require('./upload.validation');
const uploadService = require('./upload.service');

router.use(authMiddleware);

/**
 * @swagger
 * 
 * /api/upload
     *   post:
 *     summary: Upload file
 *     tags: [Upload]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/UploadInput"
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post('', uploadService.uploadMiddleware.single('file'), validate(validation.uploadSchema), controller.uploadFile);

/**
 * @swagger
 * 
 * /api/upload
 *   post:
 *     summary: Upload file
 *     tags: [Upload]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/UploadInput"
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', uploadService.uploadMiddleware.single('file'), validate(validation.uploadSchema), controller.uploadFile);

module.exports = router;
