const express = require("express");

const {
    createFitnessPost,
    getAllFitnessPosts,
    getFitnessPostById,
    updateFitnessPost,
    deleteFitnessPost
} = require("./fitness.controller");

const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();


// Create Fitness Post
router.post(
    "/create",
    authMiddleware,
    createFitnessPost
);


// Get All Fitness Posts
router.post(
    "/",
    authMiddleware,
    getAllFitnessPosts
);


// Get Fitness Post By Id
router.post(
    "/:id",
    authMiddleware,
    getFitnessPostById
);


// Update Fitness Post
router.post(
    "/update/:id",
    authMiddleware,
    updateFitnessPost
);


// Delete Fitness Post
router.post(
    "/delete/:id",
    authMiddleware,
    deleteFitnessPost
);

module.exports = router;