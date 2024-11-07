const express = require("express");
const router = express.Router();
const texting = require("../controllers/texting");
const isAuthenticatedUser = require("../middleware/user_actions/auth");

router.post("/create", isAuthenticatedUser, texting.createMessage);

router.get("/show", isAuthenticatedUser, texting.getMessagesBetweenUsers);

router
  .route("/text/:id")
  .put(isAuthenticatedUser, texting.editMessage)
  .delete(isAuthenticatedUser, texting.deleteMessage);

module.exports = router;
