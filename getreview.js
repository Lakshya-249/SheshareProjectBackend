const { Review } = require("./Database");

// Function to get reviews for a given userid
async function getReviewsByUserId(req, res) {
  try {
    const { userid } = req.query;
    const reviews = await Review.find({ userid });
    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for the given user ID",
      });
    }
    res.json({ success: true, message: "Reviews found", reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
}

module.exports = { getReviewsByUserId };
