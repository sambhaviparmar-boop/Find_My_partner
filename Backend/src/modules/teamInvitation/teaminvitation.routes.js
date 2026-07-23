const teaminvitationController = require("./teaminvitation.controller.js");
const validation = require("./teaminvitation.validation.js")
const {authMiddleware} = require("../../core/middleware/auth.middleware.js")
const validate = require("../../core/middleware/validate.middleware.js")
const express = require("express");
const router = express.Router();


/**
 * @swagger
 * 
 * /api/team-invitation
 *   post:
 *     summary: Create team invitation
 *     tags: [Team Invitation]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateInvitationInput"
 *     responses:
 *       201:
 *         description: Team invitation created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/",authMiddleware, validate(validation.createInvitationSchema), teaminvitationController.createInvitationController);



/**
 * @swagger
 * 
 * /api/team-invitation/{id}
 *   get:
 *     summary: Get team invitation by ID
 *     tags: [Team Invitation]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team invitation fetched successfully
 *       404:
 *         description: Team invitation not found   
 */

router.get("/:id",authMiddleware, validate(validation.getInvitationByIdSchema), teaminvitationController.getInvitationByIdController);

/**
 * @swagger
 * 
 * /api /team-invitation/user/{userId}
 *   get:
 *     summary: Get team invitations of user
 *     tags: [Team Invitation]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team invitations fetched successfully
 *       404:
 *         description: Team invitations not found   
 */
router.get("/user/:userId",authMiddleware, validate(validation.getInvitationsOfUserSchema), teaminvitationController.getInvitationsOfUserController);

/**
 * @swagger
 * 
 * /api/team-invitation/team/{teamId}
 *   get:
 *     summary: Get team invitations of team
 *     tags: [Team Invitation]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team invitations fetched successfully
 *       404:
 *         description: Team invitations not found   
 */
router.get("/team/:teamId",authMiddleware, validate(validation.getInvitationsOfTeamSchema), teaminvitationController.getInvitationsOfTeamController);

/**
 * @swagger
 * 
 * /api/team-invitation/{id}
 *   delete:
 *     summary: Delete team invitation
 *     tags: [Team Invitation]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team invitation deleted successfully
 *       404:
 *         description: Team invitation not found   
 */
router.delete("/:id",authMiddleware, validate(validation.deleteInvitationSchema), teaminvitationController.deleteInvitationController);

module.exports = router;    