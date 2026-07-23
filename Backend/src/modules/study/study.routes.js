const express = require("express");

const {
    createStudyPost,
    getAllStudyPosts,
    getStudyPostById,
    updateStudyPost,
    deleteStudyPost
} = require("./study.controller");

const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();



router.post(
    "/create",
    authMiddleware,
    createStudyPost
);


// Get All Study Posts
router.post(
    "/",
    authMiddleware,
    getAllStudyPosts
);


// Get Study Post By Id
router.post(
    "/:id",
    authMiddleware,
    getStudyPostById
);



router.post(
    "/update/:id",
    authMiddleware,
    updateStudyPost
);


router.post(
    "/delete/:id",
    authMiddleware,
    deleteStudyPost
);


module.exports = router;