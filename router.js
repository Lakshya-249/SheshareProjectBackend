const express = require("express");
const router = express.Router();
const createUserMiddleware = require("./createuser");
const updateUserMiddleware = require("./createuser2");
const getUserByIdMiddleware = require("./getuser");
const getUsersMiddleware = require("./selectuserfilter");
const addReviewMiddleware = require("./addtocart");
const getCartUserMiddleware = require("./getcart");
const removeReviewMiddleware = require("./deletecart");
const setUserAvailableFalse = require("./setavailable");

// Middleware to parse JSON body
router.use(express.json());

// Route to create a new user
router.post("/createUser", createUserMiddleware);

// Route to update an existing user with additional fields
router.put("/updateUser", updateUserMiddleware);

router.put("/addcart", addReviewMiddleware);

router.put("/rent", setUserAvailableFalse);

router.get("/getuser", getUserByIdMiddleware);

router.get("/getcart", getCartUserMiddleware);

router.get("/filteruser", getUsersMiddleware);

router.delete("/deletecart", removeReviewMiddleware);

module.exports = router;
