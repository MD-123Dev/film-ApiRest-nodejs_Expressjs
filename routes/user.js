
const express = require('express');

const router = express.Router();

const authController = require('../controllers/AuthController')
        

router.post("/signup",authController.signup);
router.post("/signin",authController.signin);
router.get("/signout",authController.signout);




module.exports = router;

