import express from "express";
import * as Users from "../controllers/usersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, admin, Users.getUsers);
router.post("/", Users.register);
router.post("/login", Users.authUser);
router.get("/profile", protect, Users.getUserProfile);
router.put("/profile", protect, Users.updateUserProfile);
router.get("/:id", protect, admin, Users.getUserById);
router.put("/:id", protect, admin, Users.updateUser);
router.delete("/:id", protect, admin, Users.deleteUser);

export default router;
