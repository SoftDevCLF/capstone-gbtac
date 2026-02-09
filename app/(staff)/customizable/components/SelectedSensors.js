//The component shows a list of sensors currently added to a graph
// It allows users to see their selected sensors and remove them if needed. 
// It will eventually be connected to the graph component to update the graph based on the selected sensors.

export default function SelectedSensors() {
  return (
    <div className="bg-white rounded-sm shadow-sm p-4 mb-5 mt-1 w-1/2">
      <p style={{ fontFamily: "var(--font-titillium)" }} className="font-semibold text-black mb-4">
        Selected Sensors:
      </p>
      <div className="h-50 bg-gray-200 rounded-sm flex items-center justify-center">
        <p className="text-gray-500">Selected sensors will be displayed here</p>
      </div>

    </div>
  );
}
