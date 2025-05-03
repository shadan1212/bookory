import express from "express";
import userController from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", userController.registerUser);
router.post("/login", userController.userLogin);
router.get("/fetch-user", protect, userController.fetchUser);
router.post("/logout", userController.userLogout);
router.put("/update-profile", protect, userController.updateProfile);

export default router;
