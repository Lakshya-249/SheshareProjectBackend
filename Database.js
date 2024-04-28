const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Define the schema
const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  image: String,
  location: String,
  address: String,
  bio: String,
  house_desc: String,
  drinking_smoking: { type: Boolean, default: true },
  pets: Boolean,
  rent: Number,
  rentFrom: { type: Date, default: Date.now },
  rentTo: Date,
  week: Number,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  available: { type: Boolean, default: true },
  rentedOn: Date,
});

const reviewschema = new mongoose.Schema({
  name: String,
  userid: String,
  review: { type: String, required: true },
  rating: { type: Number, required: true },
});

// Define the model
const User = mongoose.model("User", userSchema);

const Review = mongoose.model("Review", reviewschema);

module.exports = { User, Review };
