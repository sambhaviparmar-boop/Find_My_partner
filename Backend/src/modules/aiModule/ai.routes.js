const express = require("express");
const router = express.Router();
const aiController = require("./ai.controller");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const { findSimilarUsersSchema } = require("./ai.validation");

router.get("/findSimilarUsers/:userId", authMiddleware, validate(findSimilarUsersSchema), aiController.findSimilarUsersController);

module.exports = router;
