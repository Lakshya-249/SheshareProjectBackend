const { User } = require("./Database");

const getCartUserMiddleware = async (req, res) => {
  try {
    // Get the user ID from the query parameters
    const userid = req.query.userId;

    if (!userid) {
      return res
        .status(400)
        .json({ error: "User ID is required in the query parameters" });
    }

    // Find the user by ID and populate the 'review' field with users' IDs
    const user = await User.findOne({ userid });
    if (!user) {
      return res.status(404).json({ error: "Usernot found" });
    }

    // Extract user IDs from the populated 'review' field
    // const reviewerIds = user.reviews.map((review) => review._id);

    // Find users based on the extracted IDs
    const reviewers = await User.find({ _id: { $in: user.reviews } });

    // Send the reviewers as response
    res.status(200).json(reviewers);
  } catch (error) {
    console.error("Error fetching cart users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Example route definition using Express
// Assuming you have a route like GET /reviewers?userId=:userId
module.exports = getCartUserMiddleware;
