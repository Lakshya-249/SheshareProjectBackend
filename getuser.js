const User = require("./Database");

// Middleware function to get a user by userid
async function getUserByIdMiddleware(req, res, next) {
  try {
    const { userid } = req.query;

    if (!userid) {
      return res.status(400).json({ error: "userid is required" });
    }

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);
    res.status(200).json(user); // Respond with the found user
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Error getting user" }); // Handle error
  }
}

module.exports = getUserByIdMiddleware;
