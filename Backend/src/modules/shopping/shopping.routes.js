const express = require("express");

const {
    createShoppingPost,
    getAllShoppingPosts,
    getShoppingPostById,
    updateShoppingPost,
    deleteShoppingPost
} = require("./shopping.controller");

const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();


// Create Shopping Post
router.post(
    "/create",
    authMiddleware,
    createShoppingPost
);


// Get All Shopping Posts
router.post(
    "/",
    authMiddleware,
    getAllShoppingPosts
);


// Get Shopping Post By Id
router.post(
    "/:id",
    authMiddleware,
    getShoppingPostById
);


// Update Shopping Post
router.post(
    "/update/:id",
    authMiddleware,
    updateShoppingPost
);


// Delete Shopping Post
router.post(
    "/delete/:id",
    authMiddleware,
    deleteShoppingPost
);


module.exports = router;