import { useState } from "react";

const AREAS = ["Car Park A", "Car Park B"];
const SLOTS = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

function BookParkingPage() {
  const [area, setArea] = useState("Car Park A");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleConfirm = () => {
    if (!selectedSlot || !date || !fromTime || !toTime) {
      alert("Please select slot, date and time before confirming.");
      return;
    }

    // For now just show a message. Later this will call the backend.
    alert(
      `Booking confirmed:\n\nArea: ${area}\nSlot: ${selectedSlot}\nDate: ${date}\nTime: ${fromTime} - ${toTime}`
    );
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
            Confirm Booking (demo)
          </button>

          <p className="text-[11px] text-slate-400">
            This button will later send the booking to the backend (Node.js +
            MongoDB). For now it just shows a confirmation popup to demonstrate
            the flow.
          </p>
        </div>
      </section>
    </div>
  );
}

export default BookParkingPage;
