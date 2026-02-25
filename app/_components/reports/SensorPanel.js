//This component is for the Staff to search through the sensors in database and select any amount to be generated for the report. 
//It is used in the ReportControls component, and it holds the state for the selected sensor, which is passed down to the ReportControls component as a prop.

"use client";

export default function SensorPanel({ sensors = [], selectedSensors, onSelect }) {
  return (
    <div className="flex flex-col h-50 overflow-y-auto border p-5 rounded shadow-sm">
      <label
        className="text-sm text-black mb-2 font-semibold"
        style={{ fontFamily: "var(--font-titillium)" }}
      >
        Select Sensors
      </label>

      <input
        type="text"
        placeholder="Search sensors..."
        className="mb-2 p-2 border rounded text-gray-700"
        onChange={(e) => onSelect(null, e.target.value)}
      />
      <div className="flex flex-col gap-1">
        {sensors.map((sensor) => (
          <label key={sensor.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSensors.some(s => s.id === sensor.id)}
              onChange={() => onSelect(sensor)}
              className="w-4 h-4"
            />
            <span className="text-gray-800">{sensor.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}