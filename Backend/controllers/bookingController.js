import Booking from "../models/Booking.js";

const DEFAULT_SORT = { date: 1, fromTime: 1 };

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort(DEFAULT_SORT);
    res.json(bookings);
  } catch (err) {
    console.error("Failed to fetch bookings", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const createBooking = async (req, res) => {
  const { area, slot, date, fromTime, toTime } = req.body;

  if (!area || !slot || !date || !fromTime || !toTime) {
    return res.status(400).json({ message: "Missing booking details" });
  }

  try {
    const booking = await Booking.create({
      area,
      slot,
      date,
      fromTime,
      toTime,
      userId: req.userId || null,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Failed to create booking", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error("Failed to update booking", err);
    res.status(500).json({ message: "Failed to update booking" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("Failed to delete booking", err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
