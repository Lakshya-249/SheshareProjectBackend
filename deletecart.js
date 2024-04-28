const { User } = require("./Database");

const removeReviewMiddleware = async (req, res, next) => {
  try {
    // Get the user ID from the request parameters
    const userId = req.query.userId;

    // Get the review ID to remove from the request body
    const reviewIdToRemove = req.body.reviewId;

    if (!reviewIdToRemove) {
      return res
        .status(400)
        .json({ error: "Review ID is required in the request body" });
    }

    // Find the user by ID
    const user = await User.findOne({ userid: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the review ID from the reviews array
    const index = user.reviews.indexOf(reviewIdToRemove);
    if (index !== -1) {
      user.reviews.splice(index, 1);
    }

    // Save the user document
    await user.save();

    // Send success response
    res.status(200).json({ message: "Review ID removed successfully" });
  } catch (error) {
    console.error("Error removing review ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeReviewMiddleware;
