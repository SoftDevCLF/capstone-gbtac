//This component contains various settings for customizing the chart display such as titles, axis, and chart type. 
//This component also has two other dropdowns containing the times (Hourly, Daily, Monthly, Yearly) and the aggregation.
"use client";

export default function ChartSettings({settings, setSettings}) {

  return (
    <div style={{ fontFamily: "var(--font-titillium)" }} className="bg-white rounded-sm shadow-sm p-4 w-full h-full">
      <h2 className="font-semibold text-black mb-4">Chart Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Chart Title</label>
          <input
            type="text"
            placeholder="Chart Title"
            value={settings.chartTitle}
            onChange={(e) => setSettings(prev => ({...prev, chartTitle: e.target.value}))}
            className="border p-2 rounded text-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Chart Type</label>
          <select
            value={settings.chartType}
            onChange={(e) => setSettings(prev => ({...prev, chartType: e.target.value}))}
            className="border p-2 rounded text-gray-500"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="area">Area</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">X-Axis Title</label>
            <input
              type="text"
              placeholder="X-Axis Title"
              value={settings.xAxisTitle}
              onChange={(e) => setSettings(prev => ({...prev, xAxisTitle: e.target.value}))}
              className="border p-2 rounded text-gray-500"
            />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Y-Axis Title</label>
          <input
            type="text"
            placeholder="Y-Axis Title"
            value={settings.yAxisTitle}
            onChange={(e) => setSettings(prev => ({...prev, yAxisTitle: e.target.value}))}
            className="border p-2 rounded text-gray-500"
          />
          </div>
      </div>

      {/* Info text */}
      <div className="mt-4 text-gray-500">
        {settings.chartTitle
          ? "Chart settings implemented. You can change it anytime."
          : "Implement the chart settings to customize your chart and easily identify it later."}
      </div>
    </div>
  );
}

