const express = require("express");

const {
    createTravelPost,
    getAllTravelPosts,
    getTravelPostById,
    updateTravelPost,
    deleteTravelPost
} = require("./travel.controller");

const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();


// Create Travel Post
router.post(
    "/create",
    authMiddleware,
    createTravelPost
);


// Get All Travel Posts
router.post(
    "/",
    authMiddleware,
    getAllTravelPosts
);


// Get Travel Post By Id
router.post(
    "/:id",
    authMiddleware,
    getTravelPostById
);


// Update Travel Post
router.post(
    "/update/:id",
    authMiddleware,
    updateTravelPost
);


// Delete Travel Post
router.post(
    "/delete/:id",
    authMiddleware,
    deleteTravelPost
);


module.exports = router;