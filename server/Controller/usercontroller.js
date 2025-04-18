import User from "../Model/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Create a new user
export const create = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    const saveData = await newUser.save();

    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get logged-in user using JWT
export const getLoggedInUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};
