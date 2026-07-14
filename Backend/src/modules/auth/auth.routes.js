const express = require('express');
const { registerUser, loginUser, logoutUser, getme } 
= require('./auth.controller');
const { registerSchema, loginSchema } = require('./auth.validation');
const validate = require('../../core/middleware/validate.middleware');
const errorHandler = require('../../core/middleware/error.middleware');
const { authMiddleware } = require('./auth.middleware');
const router = express.Router();



router.post("/register",validate(registerSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);
router.get("/me",authMiddleware, getme);
router.post("/logout", logoutUser);


router.use(errorHandler)



module.exports = router;
