const { User } = require("./Database");

const setUserAvailableFalse = async (req, res, next) => {
  const userId = req.query.userId; // Assuming the _id is passed as a parameter in the URL

  try {
    // Assuming `User` is your Mongoose model
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Set the `available` field to false
    user.available = !user.available;
    let yourDate = new Date();
    let date = yourDate.toISOString().split("T")[0];

    user.rentedOn = date;

    // Save the updated user document
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update user");
  }
};

module.exports = setUserAvailableFalse;
