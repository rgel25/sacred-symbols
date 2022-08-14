import express from "express";
import * as Products from "../controllers/productsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", Products.index);
router.post("/", protect, admin, Products.createProduct);
router.get("/top", Products.getTopProducts);
router.post("/:id/reviews", protect, Products.createProductReview);
router.get("/:id", Products.showProduct);
router.put("/:id", Products.updateProduct);
router.delete("/:id", protect, admin, Products.deleteProduct);

export default router;
