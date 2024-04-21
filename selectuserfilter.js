const User = require("./Database");

// Middleware function to get users based on filters
async function getUsersMiddleware(req, res, next) {
  try {
    const { location, cost } = req.query;

    let query = {};

    // Apply filters if provided
    if (location) {
      query.location = location;
    }
    if (cost) {
      query.rent = { $lte: parseInt(cost) };
    }

    const users = await User.find(query);
    console.log("Users found:", users);
    res.status(200).json(users); // Respond with the found users
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Error getting users" }); // Handle error
  }
}

module.exports = getUsersMiddleware;
