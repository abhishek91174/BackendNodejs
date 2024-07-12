const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer');
const { registerUser, loginUser, logoutUser,refreshAccessToken } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post("/register", upload.fields([
    { name: 'avtar', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 }
]), registerUser);

router.get("/login", loginUser);
router.get("/logout", verifyToken, logoutUser);  
router.get("/refreshToken",  refreshAccessToken);  

module.exports = router;
