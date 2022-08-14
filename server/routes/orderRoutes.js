import express from "express";
import * as Order from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, admin, Order.getOrders);
router.post("/", protect, Order.addOrderItems);
router.get("/myorders", protect, Order.getMyOrders);
router.get("/:id", protect, Order.getOrderById);
router.put("/:id/pay", protect, Order.updateOrderToPaid);
router.put("/:id/deliver", protect, admin, Order.updateOrderToDelivered);

export default router;
