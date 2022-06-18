const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", usersController.userSignUp);

router.post("/login", usersController.userLogin);

router.delete("/:userId", checkAuth, usersController.deleteUser);

module.exports = router;
