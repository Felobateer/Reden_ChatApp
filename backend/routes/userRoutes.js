const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticatedUser = require("../middleware/user_actions/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

router.post("/password/forgot", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.put(
  "/password/update",
  isAuthenticatedUser,
  userController.updatePassword
);

router.get("/details-show", isAuthenticatedUser, userController.getUserDetails);
router.put(
  "/details-update",
  isAuthenticatedUser,
  userController.updateProfile
);

module.exports = router;
