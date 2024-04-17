import express from "express";
import getUsers from "../controllers/usersController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

// Define the route for getting all users
router.get("/", adminMiddleware, getUsers);

export default router;
