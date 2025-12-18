import { useState, useEffect } from "react";

const AREAS = ["Car Park A", "Car Park B"];
const SLOTS = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

function BookParkingPage() {
  const [area, setArea] = useState("Car Park A");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Could not load bookings. The backend may be sleeping.",
      });
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = async () => {
    if (!selectedSlot || !date || !fromTime || !toTime) {
      alert("Please select slot, date and time before confirming.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area,
          slot: selectedSlot,
          date,
          fromTime,
          toTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Booking failed");
      }

      setBookings((current) => [data, ...current]);
      setStatusMessage({
        type: "success",
        text: "Booking created! Scroll down to see it listed.",
      });
      setSelectedSlot(null);
      setDate("");
      setFromTime("");
      setToTime("");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err.message || "Booking request failed",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Book Parking</h2>
        <p className="text-sm text-slate-500">
          Choose a parking area, time and an available slot to create a booking.
        </p>
      </div>

      {/* Filters */}
      <section className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Area */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">
              Parking Area
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* From Time */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">
              From
            </label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* To Time */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">To</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Slot selection + summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slot grid */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Select a parking slot
              </h3>
              <p className="text-xs text-slate-500">
                Click on an available slot to select it. (All slots are
                available in this demo.)
              </p>
            </div>
          </div>
 
        <div className="grid grid-cols-4 gap-3 max-w-md">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={[
                    "h-14 rounded-lg border flex items-center justify-center text-sm font-medium transition",
                    isSelected
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-[11px] text-slate-400">
            In the full system, colours will show availability:
            Green = Available, Red = Occupied, Yellow = Reserved, Blue = Your
            selection.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Booking Summary
          </h3>

          <div className="text-xs space-y-1 text-slate-600">
            <p>
              <span className="font-medium text-slate-500">Area: </span>
              {area}
            </p>
            <p>
              <span className="font-medium text-slate-500">Date: </span>
              {date || "Not selected"}
            </p>
            <p>
              <span className="font-medium text-slate-500">Time: </span>
              {fromTime && toTime
                ? `${fromTime} - ${toTime}`
                : "Not selected"}
            </p>
            <p>
              <span className="font-medium text-slate-500">Slot: </span>
              {selectedSlot || "No slot selected"}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-4 w-full h-10 rounded-lg bg-emerald-500 text-white text-xs font-medium disabled:opacity-50"
          >
            Confirm Booking
          </button>

          <p className="text-[11px] text-slate-400">
            Booking requests now go to the backend (Node.js + MongoDB). New
            slots land in the list below once they succeed.
          </p>
        </div>
      </section>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={[
            "mt-4 rounded-xl p-3 text-sm",
            statusMessage.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200",
          ].join(" ")}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Existing bookings */}
      <section className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Your bookings
            </h3>
            <p className="text-xs text-slate-500">
              {loadingBookings ? "Loading…" : "Latest confirmed slots appear below."}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {bookings.length === 0 && !loadingBookings && (
            <p className="text-xs text-slate-400">
              No bookings yet — create one by filling the form above.
            </p>
          )}

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600"
            >
              <p>
                <span className="font-semibold text-slate-800">
                  {booking.area}
                </span>{" "}
                • slot <span className="font-semibold">{booking.slot}</span>
              </p>
              <p>
                {booking.date} {booking.fromTime} - {booking.toTime}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookParkingPage;
