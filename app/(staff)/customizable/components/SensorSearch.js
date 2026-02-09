//Search bar for adding sensors to a graph
// sensor list and add buttons

export default function SensorSearch() {
  return (
    <div className="bg-white rounded-sm shadow-sm p-4 mb-5 mt-1 w-1/2">
      {/* Title and input inline */}
      <div className="flex items-center mb-4 gap-2">
        <p
          style={{ fontFamily: "var(--font-titillium)" }}
          className="font-semibold text-black"
        >
          Sensor Search:
        </p>
        <input
          type="text"
          placeholder="Search sensors..."
          style={{ fontFamily: "var(--font-titillium)" }}
          className="border border-gray-300 text-gray-700 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600">
          Search
        </button>
      </div>

      <p style={{ fontFamily: "var(--font-titillium)" }} className="font-semibold text-black mb-4">
        Available Sensors:
      </p>

      {/* Placeholder for sensor list */}
      <div className="h-64 bg-gray-200 rounded-sm flex items-center justify-center">
        <p className="text-gray-500">Sensor list will be displayed here</p>
      </div>
    </div>
  );
}

