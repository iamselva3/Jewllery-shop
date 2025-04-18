import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
  getLoggedInUser
} from "../Controller/usercontroller.js";

const router = express.Router();

// Create new user (signup)
router.post("/user", create);

// Get all users
router.get("/users", getAllUsers);

// Get user by ID
router.get("/user/:id", getUserById);

// Update user
router.put("/update/user/:id", update);

// Delete user
router.delete("/delete/user/:id", deleteUser);

// Get logged-in user info using token
router.get("/me", getLoggedInUser);

export default router;
