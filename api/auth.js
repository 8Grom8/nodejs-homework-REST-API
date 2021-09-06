const express = require("express");

const { validation, authenicate } = require("../middlewares");
const {user: { joiSchema }} = require("../models/schemas");
const { auth: ctrl } = require("../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrl.signup);
router.post("/signin", ctrl.signin);
router.get("/logout", authenicate, ctrl.logout);
router.get("/verify/:verifyToken", ctrl.verifyEmail);
router.patch("/avatars", authenicate, uploadMiddleware.single('avatar'), ctrl.uploadAvatar);

module.exports = router;