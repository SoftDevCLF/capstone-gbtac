"use client";
// Page for Customizable Graph Section
import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ChartSettings from "../../../_components/customgraph/ChartSettings";
import SensorSearch from "../../../_components/customgraph/SensorSearch";
import SelectedSensors from "../../../_components/customgraph/SelectedSensors";
import GraphContainer from "../../../_components/customgraph/GraphContainer";
import DateRange from "../../../_components/customgraph/DateRange";
import ChartSelect from "../../../_components/customgraph/ChartSelect";
import { useState, useEffect } from "react";

export default function Page() {

  // Applied chart state (what GraphContainer actually reads)
  const [currentChartId, setCurrentChartId] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState([{code: "30000_TL252", name: "PV-CarportSolar_Total"}, {code: "30000_TL253", name: "PV-RooftopSolar_Total"}]);
  const [dateRange, setDateRange] = useState({ from: "2025-12-31", to: "2025-12-31" });
  const [settings, setSettings] = useState({
    chartTitle: "",
    xAxisTitle: "",
    yAxisTitle: "",
    chartType: "bar",
  })

  // Temp state (user edits these before clicking Apply)
  const [tempSelectedSensors, setTempSelectedSensors] = useState(selectedSensors);
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [tempSettings, setTempSettings] = useState(settings)
  
  // full list of sensors and codes
  const [sensorList, setSensorList] = useState([])
  const fetchSensors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/graphs/codesnames")
      const data = await res.json()
      setSensorList(data)
    }catch (e){
      console.log(e)
    }
  }

  useEffect(()=> {
    fetchSensors()
  }, [])

  // Reset chart to default
  const resetChart = () => {
    setCurrentChartId(null);
    setSettings({
      chartTitle: "",
      xAxisTitle: "",
      yAxisTitle: "",
      chartType: "line",
    })
    setSelectedSensors([]);
    setDateRange({ from: null, to: null });

    // Also reset temp state
    setTempSettings({
      chartTitle: "",
      xAxisTitle: "",
      yAxisTitle: "",
      chartType: "line",
    })
    setTempSelectedSensors([]);
    setTempDateRange({ from: null, to: null });
  }

  // Load a chart into state
  const loadChart = (chart) => {
    setCurrentChartId(chart.id);
    setSettings(chart.settings);
    setSelectedSensors(chart.sensors);
    setDateRange({ from: chart.dateFrom, to: chart.dateTo });

    // Also update temp state so the inputs match loaded chart
    setTempSettings(chart.settings);
    setTempSelectedSensors(chart.sensors);
    setTempDateRange({ from: chart.dateFrom, to: chart.dateTo });
  }

  // Apply button handler
  const handleApply = () => {
    setSettings(tempSettings);
    setSelectedSensors(tempSelectedSensors);
    setDateRange(tempDateRange);
  }
  useEffect(() => {
    console.log(settings)
    
  }, [selectedSensors])

  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-10 dark:text-black"
          style={{ fontFamily: "var(--font-titillium)" }}>
          Create Custom Chart
        </h1>

        {/* Chart Selection */}
        <div className="mb-5 w-full md:w-1/2">
          <ChartSelect
            currentChartId={currentChartId}
            onLoadChart={loadChart}
            onDeleteChart={resetChart}
            onResetChart={resetChart}
          />
        </div>

        {/* Chart Settings and Date Range */}
        <div className="flex flex-col md:flex-row gap-4 mb-5 w-full">
          <ChartSettings
            settings={tempSettings}
            setSettings={setTempSettings}
          />
          <DateRange
            dateRange={tempDateRange}
            setDateRange={setTempDateRange}
          />
        </div>

        {/* Sensor Search and Selected Sensors */}
        <div className="flex gap-4 mb-4">
          <SensorSearch
            selectedSensors={tempSelectedSensors}
            setSelectedSensors={setTempSelectedSensors}
            availableSensors={sensorList}
            className="flex-1"
          />
          <SelectedSensors
            selectedSensors={tempSelectedSensors}
            setSelectedSensors={setTempSelectedSensors}
            className="flex-1"
          />
        </div>

        <div className="mb-6">
          <button
            // className="px-4 py-2 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
            className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>

        {/* Graph below */}
        <div className="w-full">
          <GraphContainer 
            selectedSensors={selectedSensors} 
            dateRange={dateRange}
            settings={settings}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}