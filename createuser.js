const User = require("./Database");

async function createUserMiddleware(req, res) {
  try {
    const { location, address, bio, image, userID } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "dev_setup",
    });

    console.log(result);

    const newUser = new User({
      location: location,
      address: address,
      bio: bio,
      image: result.url,
      userid: userID,
    });

    const savedUser = await newUser.save();
    console.log("User created:", savedUser);
    res.status(201).json(savedUser); // Respond with the created user
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" }); // Handle error
  }
}

module.exports = createUserMiddleware;
