const express = require("express");
const router = express.Router();
const createUserMiddleware = require("./createuser");
const updateUserMiddleware = require("./createuser2");

// Middleware to parse JSON body
router.use(express.json());

// Route to create a new user
router.post("/createUser", createUserMiddleware);

// Route to update an existing user with additional fields
router.put("/updateUser", updateUserMiddleware);

module.exports = router;
