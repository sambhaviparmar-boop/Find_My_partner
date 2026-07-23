const adminController = require("./admin.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const adminValidation = require("./admin.validation");
const router = require("express").Router();



router.get("/users",authMiddleware,validate(adminValidation.getAllUsersSchema),adminController.getAllUsersController);
router.get("/users/:id",authMiddleware,validate(adminValidation.getUserByIdSchema),adminController.getUserByIdController);
router.delete("/users/:id",authMiddleware,validate(adminValidation.deleteUserSchema),adminController.deleteUserController);
router.put("/users/:id",authMiddleware,validate(adminValidation.updateUserschema),adminController.updateUserController);
router.get("/users/count",authMiddleware,validate(adminValidation.countUsersSchema),adminController.countUsersController);


router.get("/teams",authMiddleware,validate(adminValidation.getAllTeamsSchema),adminController.getAllTeamsController);
router.get("/teams/:id",authMiddleware,validate(adminValidation.getTeamByIdSchema),adminController.getTeamByIdController);
router.delete("/teams/:id",authMiddleware,validate(adminValidation.deleteTeamSchema),adminController.deleteTeamController);
router.put("/teams/:id",authMiddleware,validate(adminValidation.updateTeamSchema),adminController.updateTeamController);
router.get("/teams/count",authMiddleware,validate(adminValidation.countTeamsSchema),adminController.countTeamsController);


module.exports = router;    