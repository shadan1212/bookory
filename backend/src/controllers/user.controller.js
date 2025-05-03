import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Signup
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }

    // Hashing  the password to enhance the security.
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // JWT generation.
    let token;
    if (user) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    // Storing the JWT in cookies.
    if (user) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(200).json({ message: "User created successfully.", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // JWT generation.
    let token;
    if (user) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    // Storing the JWT in cookies.
    if (user) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(200).json({ message: "User logged in successfully.", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetching User
const fetchUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logout
const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update the user
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { username, email, phone, street, city, zip, country } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
      phone,
      street,
      city,
      zip,
      country,
    });

    res
      .status(200)
      .json({ message: "User profile updated successfully!" }, updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  registerUser,
  userLogin,
  fetchUser,
  userLogout,
  updateProfile,
};
