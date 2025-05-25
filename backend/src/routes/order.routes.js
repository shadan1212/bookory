import express from "express";
import orderController from "../controllers/order.controller.js";
import protect from "../middlewares/auth.middleware.js";
import requireAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create-order", protect, orderController.placeOrder);
router.get("/user-orders", protect, orderController.getUserOrders);
router.put(
  "/status/:id",
  protect,
  requireAdmin,
  orderController.updateOrderStatus
);
router.put("/cancel/:id", protect, orderController.cancelOrder);
router.get("/:id", protect, orderController.getOrderById);

export default router;
