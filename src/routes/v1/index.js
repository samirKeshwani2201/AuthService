const express = require("express");
const userController = require("../../controllers/user-controller");
const { AuthRequestValidators } = require("../../middlewares/index");

const router = express.Router();

router.post("/signup", AuthRequestValidators.validateAuthUser, userController.create);
router.post("/signin", AuthRequestValidators.validateAuthUser, userController.signIn);
router.get("/isAuthenticated", userController.isAuthenticated);

router.get("/isAdmin", AuthRequestValidators.validateisAdminRequest, userController.isAdmin);
module.exports = router;
