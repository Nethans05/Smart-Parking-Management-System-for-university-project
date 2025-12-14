import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.get("/", protect, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Admin reports data ✅",
    adminId: req.user.id,
    role: req.user.role,
  });
});

export default router;
