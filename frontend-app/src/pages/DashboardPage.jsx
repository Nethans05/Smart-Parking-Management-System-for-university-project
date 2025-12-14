function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <p className="text-xs font-medium text-slate-500">
            Active Booking
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            No active booking
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Book a slot to see details here.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <p className="text-xs font-medium text-slate-500">
            Available Slots
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-500">
            42
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <p className="text-xs font-medium text-slate-500">
            Pending Payments
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-500">
            £0.00
          </p>
        </div>
      </section>

      {/* Parking slot map area */}
      <section className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Parking Slot Map (Demo)
            </h2>
            <p className="text-xs text-slate-500">
              We will later add click-to-select and booking logic here.
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-emerald-500 text-xs font-medium text-white">
            Book Parking Slot
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 max-w-md">
          {["A1","A2","A3","A4","B1","B2","B3","B4"].map((slot) => (
            <div
              key={slot}
              className="h-14 rounded-lg border border-slate-200 flex items-center justify-center bg-slate-50 font-medium text-sm"
            >
              {slot}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Legend: Green = Available, Red = Occupied, Yellow = Reserved,
          Blue = Your selection. (To be implemented.)
        </p>
      </section>
    </div>
  );
}

export default DashboardPage;
