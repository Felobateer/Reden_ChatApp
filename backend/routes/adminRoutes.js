const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/user_actions/auth");

router
  .route("/admin/user/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getSingleUser
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateUserRole
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.deleteUser
  );

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.getAllUsers
);

module.exports = router;
