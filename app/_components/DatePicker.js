export default function DateRangePicker({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <label className="block text-sm text-gray-600 mb-1">From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">To</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded text-gray-500"
        />
      </div>
    </div>
  );
}