const { User } = require("./Database");

// Middleware function to add more details to an existing user
async function updateUserMiddleware(req, res, next) {
  try {
    const { userid, interests } = req.body;
    console.log(interests);

    const user =
      (await User.findOne({ userid })) || (await User.findById(userid));
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user with additional fields
    Object.assign(user, interests);

    const updatedUser = await user.save();
    console.log("User updated:", updatedUser);
    res.status(200).json(updatedUser); // Respond with the updated user
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" }); // Handle error
  }
}

module.exports = updateUserMiddleware;
