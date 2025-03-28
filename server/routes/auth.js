const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const profileImage = req.file;

    if (profileImage) {
      return res.status(400).json("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    await newUser.save();
    res
      .status(200)
      .json({ mesage: "User created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed", error: err.mesage });
  }
});
