import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").get(getBookings).post(createBooking);
router.route("/:id").patch(updateBooking).delete(deleteBooking);

export default router;
