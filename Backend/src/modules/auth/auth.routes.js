const express = require("express");

const {
    registerUser,
    loginUser,
    logoutUser,
    getme,
    refreshToken
} = require("./auth.controller");

const {
    registerSchema,
    loginSchema
} = require("./auth.validation");

const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");


const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ashutosh
 *
 *               email:
 *                 type: string
 *                 example: ashu@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: password123
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 */
router.post(
    "/register",
    validate(registerSchema),
    registerUser
);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - email
 *               - password
 *
 *             properties:
 *
 *               email:
 *                 type: string
 *                 example: ashu@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 */
router.post(
    "/login",
    validate(loginSchema),
    loginUser
);




/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags:
 *       - Auth
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *
 */
router.get(
    "/me",
    authMiddleware,
    getme
);




/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *
 *     responses:
 *       200:
 *         description: Logout successful
 *
 */
router.post(
    "/logout",
    logoutUser
);




/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *
 */
router.post(
    "/refresh-token",
    refreshToken
);



module.exports = router;