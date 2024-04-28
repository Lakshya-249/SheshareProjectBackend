const { User } = require("./Database");

const addReviewMiddleware = async (req, res) => {
  try {
    // Check if the request body contains the review text
    if (!req.body.review) {
      return res.status(400).json({ error: "Review text is required" });
    }

    // Get the user ID from the request parameters
    const userId = req.query.userId;

    // Find the user by ID
    let user = await User.findOne({ userid: userId });

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({ userid: userId });
    }

    // Add the review to the user document
    user.reviews.push(req.body.review);

    // Save the user document
    await user.save();

    // Respond with the updated user document
    res.status(200).json(user);
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Error adding review" });
  }
};

module.exports = addReviewMiddleware;
