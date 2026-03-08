"use client";

//Page for Customizable Graph Section
import ChartSettings from "../../../_components/customgraph/ChartSettings";
import SensorSearch from "../../../_components/customgraph/SensorSearch";
import SelectedSensors from "../../../_components/customgraph/SelectedSensors";
import GraphPlaceholder from "@/app/_components/GraphPlaceholder";
import GraphContainer from "@/app/_components/customgraph/GraphContainer";
import DateRange from "../../../_components/customgraph/DateRange";
import DashboardLayout from "@/app/_components/DashboardLayout";
import ExportPDFButton from "@/app/_components/ExportPDFButton";
import ChartSelect from "@/app/_components/customgraph/ChartSelect";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  const chartRef = useRef(null);

  // State variables
  const [currentChartId, setCurrentChartId] = useState(null);
  const [tempChartSettings, setTempChartSettings] = useState({
    chartTitle: "",
    chartType: "line",
    xAxisTitle: "",
    yAxisTitle: ""
  });
  const [tempDateRange, setTempDateRange] = useState({
    from: "",
    to: ""
  });
  const [tempSelectedSensors, setTempSelectedSensors] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });
  const [chartSettings, setChartSettings] = useState({
    chartTitle: "",
    chartType: "line",
    xAxisTitle: "",
    yAxisTitle: ""
  });
  const [sensorList, setSensorList] = useState([]);
  const [error, setError] = useState(null);

  // Load available sensors on component mount
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch("/api/sensors");
        const sensors = await response.json();
        setSensorList(sensors);
      } catch (err) {
        console.error("Failed to fetch sensors:", err);
        setError("Failed to load sensors");
      }
    };
    fetchSensors();
  }, []);

  // Function to load a saved chart
  const loadChart = (chartData) => {
    setCurrentChartId(chartData.id);
    setTempChartSettings(chartData.settings || tempChartSettings);
    setTempDateRange(chartData.dateRange || tempDateRange);
    setTempSelectedSensors(chartData.selectedSensors || []);
    setError(null);
  };

  // Function to reset chart to new state
  const resetChart = () => {
    setCurrentChartId(null);
    setTempChartSettings({
      chartTitle: "",
      chartType: "line",
      xAxisTitle: "",
      yAxisTitle: ""
    });
    setTempDateRange({
      from: "",
      to: ""
    });
    setTempSelectedSensors([]);
    setSelectedSensors([]);
    setDateRange({
      from: "",
      to: ""
    });
    setChartSettings({
      chartTitle: "",
      chartType: "line",
      xAxisTitle: "",
      yAxisTitle: ""
    });
    setError(null);
  };

  // Function to apply temporary settings to final settings
  const handleApply = () => {
    if (tempSelectedSensors.length === 0) {
      setError("Please select at least one sensor");
      return;
    }
    if (!tempDateRange.from || !tempDateRange.to) {
      setError("Please select a date range");
      return;
    }
    setSelectedSensors([...tempSelectedSensors]);
    setDateRange({...tempDateRange});
    setChartSettings({...tempChartSettings});
    setError(null);
  };

  return (
    <DashboardLayout title="Create Custom Chart">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Chart Selection */}
        <div className="mb-4 md:mb-5 w-full max-w-md md:max-w-none md:w-1/2">
          <ChartSelect
            currentChartId={currentChartId}
            onLoadChart={loadChart}
            onDeleteChart={resetChart}
            onResetChart={resetChart}
          />
        </div>

        {/* Chart Settings and Date Range */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4 md:mb-5 w-full">
          <div className="w-full lg:w-1/2">
            <ChartSettings
              settings={tempChartSettings}
              setSettings={setTempChartSettings}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <DateRange
              dateRange={tempDateRange}
              setDateRange={setTempDateRange}
            />
          </div>
        </div>

        {/* Sensor Search and Selected Sensors */}
        <div className="flex flex-col xl:flex-row gap-4 mb-4">
          <div className="w-full xl:w-1/2">
            <SensorSearch
              selectedSensors={tempSelectedSensors}
              setSelectedSensors={setTempSelectedSensors}
              availableSensors={sensorList}
              className="w-full"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <SelectedSensors
              selectedSensors={tempSelectedSensors}
              setSelectedSensors={setTempSelectedSensors}
              className="w-full"
            />
          </div>
        </div>

          {/* Error Message Display*/}
        {error && (
          <div className="mb-4 p-3 md:p-2 bg-red-100 text-red-700 rounded-sm text-sm md:text-base">
            {error}
          </div>
        )}

        <div className="mb-4 md:mb-6 flex justify-center md:justify-start">
          <button
            className="px-6 py-2 md:px-4 md:py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition w-full md:w-auto"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>

        <div className="w-full" ref={chartRef}>
          <GraphContainer
            selectedSensors={selectedSensors} 
            dateRange={dateRange}
            settings={chartSettings}
          />
        </div>

        {/* Save and Export PDF buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button className="px-6 py-2 md:px-4 md:py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition w-full sm:w-auto order-2 sm:order-1">
            Save View
          </button>
          <div className="w-full sm:w-auto order-1 sm:order-2">
            <ExportPDFButton
              chartRef={chartRef}
              fileName={tempChartSettings.chartTitle || "custom_chart"}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}