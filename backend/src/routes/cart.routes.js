import express from "express";
import protect from "../middlewares/auth.middleware.js";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protect, cartController.getCart);
router.post("/add", protect, cartController.addItemToCart);
router.delete("/clear", protect, cartController.clearCart);
router.put("/update/:id", protect, cartController.updateItemQuantity);
router.delete("/remove/:id", protect, cartController.removeItemFromCart);

export default router;
