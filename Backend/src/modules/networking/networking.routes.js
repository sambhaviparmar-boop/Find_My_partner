const express = require("express");

const {
    createNetworkingPost,
    getAllNetworkingPosts,
    getNetworkingPostById,
    updateNetworkingPost,
    deleteNetworkingPost
} = require("./networking.controller");

const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();


router.post(
    "/create",
    authMiddleware,
    createNetworkingPost
);



router.post(
    "/",
    authMiddleware,
    getAllNetworkingPosts
);



router.post(
    "/:id",
    authMiddleware,
    getNetworkingPostById
);



router.post(
    "/update/:id",
    authMiddleware,
    updateNetworkingPost
);



router.post(
    "/delete/:id",
    authMiddleware,
    deleteNetworkingPost
);


module.exports = router;