
const express = require("express");
const {updateUser, deleteUser, getAllUsers, getUserById} = require("./user.controller");
const {authMiddleware} = require("../../core/middleware/auth.middleware");
const router = express.Router()


/**
 * 
 * @swagger
 * /api/user/update/:id
 *   post:
 *     summary: Update user
 *     tags: [User]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found   
 */
router.post("/update/:id", authMiddleware, updateUser);

/**
 * 
 * @swagger
 * /api/user/delete/:id
 *   post:
 *     summary: Delete user
 *     tags: [User]
     *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found   
 */
router.post("/delete/:id", authMiddleware, deleteUser);
/**
 * 
 * @swagger
 * /api/user/
 *   post:
 *     summary: Get all users
 *     tags: [User]
 *     security: [{bearerAuth: []}]
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       404:
 *         description: Users not found   
 */
router.post("/", authMiddleware, getAllUsers);
/**
 * 
 * @swagger
 * /api/user/:id
 *   post:
 *     summary: Get user by ID
 *     tags: [User]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found   
 */
router.post("/:id", authMiddleware, getUserById);

module.exports = router;
