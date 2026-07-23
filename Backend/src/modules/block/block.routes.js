const express = require("express");
const router = express.Router();
const blockController = require("./block.controller");
const { authMiddleware } = require("../../core/middleware/auth.middleware");
const blockValidation = require("./block.validation");
const validate = require("../../core/middleware/validate.middleware");

router.post("/", authMiddleware, validate(blockValidation.blockUserSchema), blockController.blockUserController);
router.delete("/:id", authMiddleware, blockController.deleteBlockController);
router.get("/", authMiddleware, blockController.getAllBlocksController);

module.exports = router;
