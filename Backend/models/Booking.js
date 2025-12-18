import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    area: { type: String, required: true },
    slot: { type: String, required: true },
    date: { type: String, required: true },
    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
