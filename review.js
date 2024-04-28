const { Review } = require("./Database");
// Function to handle POST request to add a review
async function addReview(userid, reviewText, rating) {
  try {
    const newReview = new Review({ userid, review: reviewText, rating });
    await newReview.save();
    return {
      success: true,
      message: "Review added successfully",
      review: newReview,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add review",
      error: error.message,
    };
  }
}

// Function to handle DELETE request to remove a review
// Function to handle POST request to add a review
async function addReview(req, res) {
  try {
    const { name, userid, review, rating } = req.body;
    const newReview = new Review({ name, userid, review, rating });
    await newReview.save();
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
}

// Function to handle DELETE request to remove a review
async function deleteReview(req, res) {
  try {
    const reviewId = req.params.reviewId;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    res.json({
      success: true,
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
}

module.exports = { addReview, deleteReview };
