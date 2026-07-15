
const express = require("express");
const {updateUser, deleteUser, getAllUsers, getUserById} = require("./user.controller");
const {authMiddleware} = require("../auth/auth.middleware");
const router = express.Router()

router.post("/update/:id", authMiddleware, updateUser);
router.post("/delete/:id", authMiddleware, deleteUser);
router.post("/", authMiddleware, getAllUsers);
router.post("/:id", authMiddleware, getUserById);

module.exports = router;
