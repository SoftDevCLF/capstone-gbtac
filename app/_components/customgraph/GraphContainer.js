//This component is a placeholder for the graph container that will display the customized graph based on user input from the Chart Settings.
// It currently contains a title and a placeholder area where the graph will be rendered in the future.
// The graph has two buttons for saving the current view and exporting the graph as a PDF

import CustomHandler from "../graphs/handlers/CustomHandler";

export default function GraphContainer({selectedSensors, dateRange, settings}) {
  return (
    <div className="w-full h-64 bg-white rounded-lg shadow flex items-center justify-center text-gray-400`">

      <p
        style={{ fontFamily: "var(--font-titillium)" }}
        className="font-semibold text-black mb-4"
      >
      </p>
      <div className="w-full bg-gray-200 rounded-sm flex items-center justify-center mb-4">
        <CustomHandler
          selectedSensors={selectedSensors} 
          dateRange={dateRange}
          settings={settings}
        />
      </div>
    </div>
  );
}

