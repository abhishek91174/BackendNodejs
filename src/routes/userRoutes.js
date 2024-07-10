const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");


// router.route("/register").post(registerUser);
router.post("/register",registerUser);

module.exports = router;
