// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer'); // Correct import
const { registerUser } = require('../controllers/userController');

router.post("/register", upload.fields([
    { name: 'avtar', maxCount: 1 }, 
    { name: 'coverImg', maxCount: 1 }
]), registerUser);

module.exports = router;
