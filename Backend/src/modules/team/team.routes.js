const express = require("express");
const router = express.Router();
const {
    createTeamController,
    getTeamByIdController,
    getTeamsByUserIdController,
    updateTeamController,
    deleteTeamController,
    addMemberController,
    removeMemberController,
    getTeamMembersCountController
} = require("./team.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const validate = require("../../core/middleware/validate.middleware");
const {
    createTeamValidation,
    updateTeamValidation,
    deleteTeamValidation,
    getTeamByIdValidation
} = require("./team.validation");

/**
 * @swagger
 * tags:
 *   name: Team Invitation
 *   description: Team invitation management APIs
 */
/**
 * @swagger
 * 
 * 
 * 
 *  /**
    

 * /api/team-invitation:
 *   post:
 *     summary: Create team invitation
 *     tags:
 *       - Team Invitation
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               teamId:
 *                 type: integer
 *                 example: 1
 *
 *               userId:
 *                 type: integer
 *                 example: 5
 *
 *     responses:
 *       201:
 *         description: Invitation created successfully
 *
 *       400:
 *         description: Validation error
 *
 */

router.post("/", authMiddleware, validate(createTeamValidation), createTeamController);



router.put("/:teamId", authMiddleware, validate(updateTeamValidation), updateTeamController);



router.delete("/:teamId", authMiddleware, validate(deleteTeamValidation), deleteTeamController);

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teams fetched successfully
 */
router.get("/user/:userId", authMiddleware, getTeamsByUserIdController);    

 /*
 @swagger  
 summarry getTeamById
 get team by id
 /api/team/teamId
 @param {number} teamId
 @returns {object} team
 @route GET /api/team/teamId
 @access private
 
 200 ok
 401 una
 404 not found
 500 internal server error
 
 
 */
router.get("/:teamId", authMiddleware, validate(getTeamByIdValidation), getTeamByIdController);

/*
swagger for getTeamMembersCountController
@swagger
/api/team/:teamId/members/count
@method GET
@access private
@returns {object} teamMembersCount
@description Get team members count
@response 200 OK
@response 401 Unauthorized
@response 404 Not Found
@response 500 Internal Server Error
*/

router.get("/:teamId/members/count", authMiddleware, getTeamMembersCountController);

module.exports = router;
